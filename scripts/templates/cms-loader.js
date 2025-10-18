/**
 * CMS Loader for Webflow Static Exports
 * Loads JSON data (converted from CSV) and injects into HTML placeholders
 */

class CMSLoader {
  constructor(options = {}) {
    this.debug = options.debug || false;
    this.dataPath = options.dataPath || 'data/';
    this.loadedData = {};
    this.renderCounts = {};
  }

  /**
   * Initialize and load all CMS content
   */
  async init() {
    if (this.debug) console.log('[CMS Loader] Starting CMS content injection...');

    try {
      // Load all data files
      await this.loadAllData();

      // Inject content into respective sections
      this.injectTestimonials();
      this.injectSchools();
      this.injectAmbassadors();
      this.injectTeachers();

      if (this.debug) {
        console.log('[CMS Loader] CMS content injection completed');
        console.log('[CMS Loader] Render summary:', this.renderCounts);
      }
    } catch (error) {
      console.error('[CMS Loader] Error during initialization:', error);
    }
  }

  /**
   * Load all JSON data files
   */
  async loadAllData() {
    const collections = ['testimonials', 'schools', 'ambassadors', 'teachers'];

    for (const collection of collections) {
      try {
        const data = await this.loadData(`cms-${collection}.json`);
        this.loadedData[collection] = data;
        if (this.debug) {
          console.log(`[CMS Loader] Loaded ${collection}: ${data.total_count} items`);
        }
      } catch (error) {
        console.error(`[CMS Loader] Failed to load ${collection}:`, error);
        this.loadedData[collection] = { items: [] };
      }
    }
  }

  /**
   * Fetch JSON data
   */
  async loadData(filename) {
    const response = await fetch(`${this.dataPath}${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}: ${response.statusText}`);
    }
    return await response.json();
  }

  /**
   * Inject Testimonials
   */
  injectTestimonials() {
    const testimonials = this.loadedData.testimonials?.items || [];
    if (testimonials.length === 0) return;

    // Find testimonial containers
    const containers = document.querySelectorAll('.new-comments-wraper .w-dyn-items');

    if (containers.length === 0) {
      if (this.debug) console.log('[CMS Loader] No testimonial containers found');
      return;
    }

    let itemsRendered = 0;
    const itemsPerContainer = Math.ceil(testimonials.length / containers.length);

    containers.forEach((container, index) => {
      if (!this.shouldInject(container)) return;

      const startIdx = index * itemsPerContainer;
      const endIdx = Math.min(startIdx + itemsPerContainer, testimonials.length);
      const itemsToRender = testimonials.slice(startIdx, endIdx);

      container.innerHTML = '';

      itemsToRender.forEach(item => {
        const element = this.createTestimonialCard(item);
        container.appendChild(element);
        itemsRendered++;
      });

      // Remove "No items found" message
      const emptyDiv = container.parentElement.querySelector('.w-dyn-empty');
      if (emptyDiv) emptyDiv.style.display = 'none';
    });

    this.renderCounts.testimonials = itemsRendered;
    if (this.debug) console.log(`[CMS Loader] Rendered ${itemsRendered} testimonials`);

    // Setup "ver más comentarios" button
    this.setupTestimonialsButton();
  }

  /**
   * Create testimonial card element
   */
  createTestimonialCard(item) {
    const div = document.createElement('div');
    div.className = 'w-dyn-item w-col w-col-4';
    div.setAttribute('role', 'listitem');

    div.innerHTML = `
      <div class="card-wraper comments">
        <img src="${item.stars || ''}" loading="lazy" alt="Rating" class="image-50">
        <p class="testimonials comment">${this.escapeHtml(item.comment)}</p>
        <div class="div-block-30">
          <img src="${item.photo || ''}" loading="lazy" alt="${this.escapeHtml(item.name)}" class="image-49">
          <div class="div-block-31">
            <div class="heading-5">${this.escapeHtml(item.name)}</div>
            <div class="text-block-6">${this.escapeHtml(item.career)}</div>
          </div>
        </div>
      </div>
    `;

    return div;
  }

  /**
   * Setup testimonials "ver más" button
   */
  setupTestimonialsButton() {
    const button = document.querySelector('.new-comments-wraper .button.variant-color.small');
    const moreSection = document.querySelector('.collection-list-3.more-comments');

    if (button && moreSection) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        moreSection.style.display = moreSection.style.display === 'none' ? 'flex' : 'none';
        button.textContent = moreSection.style.display === 'none' ? 'ver más comentarios' : 'ver menos comentarios';
      });
    }
  }

  /**
   * Inject Schools
   */
  injectSchools() {
    const schools = this.loadedData.schools?.items || [];
    if (schools.length === 0) return;

    // Find school containers
    const mainContainer = document.querySelector('.schools-section .collection-list-4.w-dyn-items');
    const moreContainer = document.querySelector('.schools-section .more-schools .w-dyn-items');

    if (!mainContainer) {
      if (this.debug) console.log('[CMS Loader] No school containers found');
      return;
    }

    let itemsRendered = 0;

    // Render first 6 schools in main container
    if (this.shouldInject(mainContainer)) {
      mainContainer.innerHTML = '';
      const mainSchools = schools.slice(0, 6);

      mainSchools.forEach(item => {
        const element = this.createSchoolItem(item, true);
        mainContainer.appendChild(element);
        itemsRendered++;
      });

      // Remove "No items found"
      const emptyDiv = mainContainer.parentElement.querySelector('.w-dyn-empty');
      if (emptyDiv) emptyDiv.style.display = 'none';
    }

    // Render remaining schools in "more" container
    if (moreContainer && this.shouldInject(moreContainer)) {
      moreContainer.innerHTML = '';
      const moreSchools = schools.slice(6);

      moreSchools.forEach(item => {
        const element = this.createSchoolItem(item, false);
        moreContainer.appendChild(element);
        itemsRendered++;
      });

      // Remove "No items found"
      const emptyDiv = moreContainer.parentElement.querySelector('.w-dyn-empty');
      if (emptyDiv) emptyDiv.style.display = 'none';
    }

    this.renderCounts.schools = itemsRendered;
    if (this.debug) console.log(`[CMS Loader] Rendered ${itemsRendered} schools`);

    // Setup "ver más establecimientos" button
    this.setupSchoolsButton();
  }

  /**
   * Create school item element
   */
  createSchoolItem(item, isMain = false) {
    const div = document.createElement('div');
    div.setAttribute('role', 'listitem');

    if (isMain) {
      div.className = 'collection-item-8 w-dyn-item';
      div.innerHTML = `
        <a href="https://api.whatsapp.com/send?phone=+56224053986&text=Hola, me gustaría matricularme en el Preu con el convenio de mi colegio" class="link-block-10 w-inline-block">
          <div class="schools-item-wraper">
            <img alt="${this.escapeHtml(item.name)}" loading="lazy" src="${item.logo || ''}" class="image-51">
            <div>
              <div class="school-text main">${this.escapeHtml(item.name)}</div>
              <div class="school-text state">${this.escapeHtml(item.comuna)}</div>
            </div>
          </div>
        </a>
      `;
    } else {
      div.className = 'w-dyn-item';
      div.innerHTML = `
        <div class="schools-item-wraper">
          <img alt="${this.escapeHtml(item.name)}" loading="lazy" src="${item.logo || ''}" class="image-51">
          <div>
            <div class="school-text">${this.escapeHtml(item.name)}</div>
            <div class="school-text state">${this.escapeHtml(item.comuna)}</div>
          </div>
          <a href="https://api.whatsapp.com/send?phone=+56224053986&text=Hola, me gustaría matricularme en el Preu con el convenio de mi colegio" class="button variant-color small extra outlined hiden">obtener convenio</a>
        </div>
      `;
    }

    return div;
  }

  /**
   * Setup schools "ver más" button
   */
  setupSchoolsButton() {
    const button = document.querySelector('.schools-section .button.variant-color.small');
    const moreSection = document.querySelector('.collection-list-wrapper-2.more-schools');

    if (button && moreSection) {
      // Initially hide more schools
      moreSection.style.display = 'none';

      button.addEventListener('click', (e) => {
        e.preventDefault();
        const isHidden = moreSection.style.display === 'none';
        moreSection.style.display = isHidden ? 'block' : 'none';
        button.textContent = isHidden ? 'ver menos establecimientos' : 'ver más establecimientos';
      });
    }
  }

  /**
   * Inject Ambassadors
   */
  injectAmbassadors() {
    const ambassadors = this.loadedData.ambassadors?.items || [];
    if (ambassadors.length === 0) return;

    // Find ambassador containers (desktop and mobile)
    const desktopContainer = document.querySelector('.ambassador-wrapper .w-dyn-items');
    const mobileContainer = document.querySelector('.ambassador-mobile-wraper .w-dyn-items');

    let itemsRendered = 0;

    // Render in desktop container
    if (desktopContainer && this.shouldInject(desktopContainer)) {
      desktopContainer.innerHTML = '';

      ambassadors.slice(0, 12).forEach(item => {
        const element = this.createAmbassadorItem(item);
        desktopContainer.appendChild(element);
        itemsRendered++;
      });

      // Remove "No items found"
      const emptyDiv = desktopContainer.parentElement.querySelector('.w-dyn-empty');
      if (emptyDiv) emptyDiv.style.display = 'none';
    }

    // Render in mobile container
    if (mobileContainer && this.shouldInject(mobileContainer)) {
      mobileContainer.innerHTML = '';

      ambassadors.slice(0, 12).forEach(item => {
        const element = this.createAmbassadorItem(item);
        mobileContainer.appendChild(element);
      });

      // Remove "No items found"
      const emptyDiv = mobileContainer.parentElement.querySelector('.w-dyn-empty');
      if (emptyDiv) emptyDiv.style.display = 'none';
    }

    this.renderCounts.ambassadors = itemsRendered;
    if (this.debug) console.log(`[CMS Loader] Rendered ${itemsRendered} ambassadors`);
  }

  /**
   * Create ambassador item element
   */
  createAmbassadorItem(item) {
    const div = document.createElement('div');
    div.className = 'collection-item w-dyn-item w-col w-col-2';
    div.setAttribute('role', 'listitem');

    const instagramHandle = item.name || item.instagram_link.split('/').pop();

    div.innerHTML = `
      <a href="${item.instagram_link || '#'}" target="_blank" class="w-inline-block">
        <img alt="${this.escapeHtml(instagramHandle)}" loading="lazy" width="105" src="${item.profile_picture || ''}" class="image-26">
      </a>
      <div class="text-block-2">${this.escapeHtml(instagramHandle)}</div>
    `;

    return div;
  }

  /**
   * Inject Teachers
   */
  injectTeachers() {
    const teachers = this.loadedData.teachers?.items || [];
    if (teachers.length === 0) return;

    // Find teacher container (in slider)
    const container = document.querySelector('.slider-wrapper .w-dyn-items');

    if (!container || !this.shouldInject(container)) {
      if (this.debug) console.log('[CMS Loader] No teacher container found');
      return;
    }

    container.innerHTML = '';
    let itemsRendered = 0;

    teachers.forEach(item => {
      const element = this.createTeacherItem(item);
      container.appendChild(element);
      itemsRendered++;
    });

    // Remove "No items found"
    const emptyDiv = container.parentElement.querySelector('.w-dyn-empty');
    if (emptyDiv) emptyDiv.style.display = 'none';

    this.renderCounts.teachers = itemsRendered;
    if (this.debug) console.log(`[CMS Loader] Rendered ${itemsRendered} teachers`);
  }

  /**
   * Create teacher item element
   */
  createTeacherItem(item) {
    const div = document.createElement('div');
    div.className = 'slider-item w-dyn-item';
    div.setAttribute('role', 'listitem');

    div.innerHTML = `
      <div data-w-id="d73613dd-74c1-c067-729b-812c442c682d" class="team-item-wraper">
        <img loading="lazy" src="${item.image_negative || ''}" alt="${this.escapeHtml(item.name)}" class="image-information-hiden">
        <img loading="lazy" src="${item.image_positive || ''}" alt="${this.escapeHtml(item.name)}" class="image-information-show">
      </div>
    `;

    return div;
  }

  /**
   * Check if container should be injected (has empty bindings or "No items found")
   */
  shouldInject(container) {
    if (!container) return false;

    const hasEmptyBindings = container.querySelector('.w-dyn-bind-empty') !== null;
    const hasNoItemsText = container.textContent.includes('No items found');
    const isEmpty = container.children.length === 0;

    return hasEmptyBindings || hasNoItemsText || isEmpty;
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const loader = new CMSLoader({ debug: true });
    loader.init();
  });
} else {
  const loader = new CMSLoader({ debug: true });
  loader.init();
}
