# -*- coding: utf-8 -*-
import json
from meta_about_shri_moksham import about_shri_moksham_meta
from meta_atmabodh import atmabodh_meta
from meta_the_mind_is_not_the_self import the_mind_meta
from meta_course_requirements import course_requirements_meta

with open('scratch_manuscripts_data.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

checks = [
    ('About Shri Moksham', d['about'], about_shri_moksham_meta),
    ('Atmabodh', d['atmabodh'], atmabodh_meta),
    ('The Mind Is Not the Self', d['mind'], the_mind_meta),
    ('Course Requirements', d['course'], course_requirements_meta),
]

for name, paras, meta in checks:
    all_text = meta['body_html'] + meta['epigraph'] + meta['master_title_prefix'] + meta['master_title_shimmer'] + meta['title']
    norm_text = all_text.replace('“', '"').replace('”', '"').replace('’', "'").replace('‘', "'").replace('—', '-').replace('&amp;', '&')
    missing = []
    for i, p in enumerate(paras):
        norm_p = p.replace('“', '"').replace('”', '"').replace('’', "'").replace('‘', "'").replace('—', '-').strip()
        if norm_p not in norm_text:
            missing.append((i, p))
    print(f"=== {name} ===")
    print(f"Total paras: {len(paras)}, Missing: {len(missing)}")
    for i, p in missing:
        print(f"  [{i}] {p[:70]}...")
