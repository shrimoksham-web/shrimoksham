import os
import re

dir_path = 'd:/Website/Astrology'

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content.replace('4-5 MONTH MASTERCLASS:', '4-5 MONTH (100 Hrs) MASTERCLASS:')
    new_content = new_content.replace('4-5 Month Course', '4-5 Month (100 Hrs) Course')
    new_content = new_content.replace('4-5 Month Masterclass', '4-5 Month (100 Hrs) Masterclass')
    new_content = new_content.replace('4-5 month', '4-5 month (100 hrs)')
    new_content = new_content.replace('4-5 Month Comprehensive', '4-5 Month (100 Hrs) Comprehensive')
    
    # Fix double replacements just in case
    new_content = new_content.replace('(100 Hrs) (100 Hrs)', '(100 Hrs)')
    new_content = new_content.replace('(100 hrs) (100 hrs)', '(100 hrs)')

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk(dir_path):
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            replace_in_file(os.path.join(root, file))

print("Done updating 4-5 month texts.")
