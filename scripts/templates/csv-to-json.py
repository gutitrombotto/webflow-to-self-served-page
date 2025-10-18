#!/usr/bin/env python3
"""
CSV to JSON Converter for Webflow CMS Data
Converts exported Webflow CSV files into structured JSON for client-side loading
"""

import csv
import json
import glob
import os
import re
from html import unescape
from datetime import datetime

class CSVToJSONConverter:
    def __init__(self, debug=True):
        self.debug = debug
        self.processed_files = []

    def clean_html(self, text):
        """Remove HTML tags and clean content"""
        if not text or text.strip() == '':
            return ''
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', '', text)
        # Unescape HTML entities
        text = unescape(text)
        # Clean up whitespace
        text = ' '.join(text.split())
        return text.strip()

    def parse_boolean(self, value):
        """Parse boolean values from CSV"""
        if isinstance(value, bool):
            return value
        if isinstance(value, str):
            return value.lower() in ('true', 'yes', '1')
        return False

    def convert_csv_to_json(self, csv_filepath, output_filepath):
        """Convert a single CSV file to JSON"""
        try:
            collection_name = os.path.basename(csv_filepath).replace('.csv', '')

            if self.debug:
                print(f"\n📄 Processing: {csv_filepath}")

            items = []
            with open(csv_filepath, 'r', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)

                for row in reader:
                    # Skip archived or draft items
                    if self.parse_boolean(row.get('Archived', False)):
                        continue
                    if self.parse_boolean(row.get('Draft', False)):
                        continue

                    # Build item based on collection type
                    item = self.build_item(collection_name, row)
                    if item:
                        items.append(item)

            # Sort by order field if available
            if items and 'order' in items[0]:
                items.sort(key=lambda x: x.get('order', 999))

            # Create output structure
            output_data = {
                "collection": collection_name,
                "total_count": len(items),
                "generated_at": datetime.now().isoformat(),
                "items": items
            }

            # Write JSON file
            os.makedirs(os.path.dirname(output_filepath), exist_ok=True)
            with open(output_filepath, 'w', encoding='utf-8') as jsonfile:
                json.dump(output_data, jsonfile, ensure_ascii=False, indent=2)

            if self.debug:
                print(f"✅ Created: {output_filepath} ({len(items)} items)")

            self.processed_files.append({
                'collection': collection_name,
                'items': len(items),
                'output': output_filepath
            })

            return True

        except Exception as e:
            print(f"❌ Error processing {csv_filepath}: {str(e)}")
            return False

    def build_item(self, collection_name, row):
        """Build item structure based on collection type"""

        # Common fields
        item = {
            "id": row.get('Item ID', ''),
            "slug": row.get('Slug', ''),
            "created_on": row.get('Created On', ''),
            "updated_on": row.get('Updated On', ''),
            "published_on": row.get('Published On', '')
        }

        # Collection-specific fields
        if collection_name == 'testimonials':
            item.update({
                "name": row.get('Nombre del alumno', ''),
                "career": row.get('Carrera / Puntaje', ''),
                "photo": row.get('Foto Estudiante', ''),
                "stars": row.get('Estrellas', ''),
                "comment": self.clean_html(row.get('Comentario', '')),
                "comment_html": row.get('Comentario', ''),
                "order": int(row.get('Orden', 999)) if row.get('Orden', '').strip() else 999
            })

        elif collection_name == 'schools':
            item.update({
                "name": row.get('Name', ''),
                "logo": row.get('Logo', ''),
                "comuna": row.get('Comuna', ''),
                "order": int(row.get('Orden', 999)) if row.get('Orden', '').strip() else 999
            })

        elif collection_name == 'ambassadors':
            item.update({
                "name": row.get('Name', ''),
                "profile_picture": row.get('Profile Picture', ''),
                "instagram_link": row.get('Instagram Link', ''),
                "order": int(row.get('Order', 999)) if row.get('Order', '').strip() else 999
            })

        elif collection_name == 'teachers':
            item.update({
                "name": row.get('Nombre del profesor', ''),
                "image_positive": row.get('Imagen en positivo', ''),
                "image_negative": row.get('Imagen en negativo', ''),
                "order": int(row.get('Orden', 999)) if row.get('Orden', '').strip() else 999
            })

        return item

    def process_all_csv_files(self):
        """Process all CSV files in the current directory"""
        csv_files = glob.glob('*.csv')

        if not csv_files:
            print("❌ No CSV files found in current directory")
            return False

        print(f"\n🚀 Starting CSV to JSON conversion...")
        print(f"📋 Found {len(csv_files)} CSV file(s)")

        for csv_file in csv_files:
            collection_name = csv_file.replace('.csv', '')
            output_file = f'data/cms-{collection_name}.json'
            self.convert_csv_to_json(csv_file, output_file)

        print(f"\n✨ Conversion complete!")
        print(f"📊 Summary:")
        for info in self.processed_files:
            print(f"   - {info['collection']}: {info['items']} items → {info['output']}")

        return True


def main():
    converter = CSVToJSONConverter(debug=True)
    converter.process_all_csv_files()


if __name__ == '__main__':
    main()
