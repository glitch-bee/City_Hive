import re

section_files = {
    "main.js":    ("<!-- --- BEGIN main.js --- -->",    "<!-- --- END main.js --- -->"),
    "markers.js": ("<!-- --- BEGIN markers.js --- -->", "<!-- --- END markers.js --- -->"),
    "user_markers.js": ("<!-- --- BEGIN user_markers.js --- -->", "<!-- --- END user_markers.js --- -->"),
    "ui.js":      ("<!-- --- BEGIN ui.js --- -->",      "<!-- --- END ui.js --- -->"),
    "utils.js":   ("<!-- --- BEGIN utils.js --- -->",   "<!-- --- END utils.js --- -->"),
}

with open('docs/index.html', encoding='utf-8') as f:
    html = f.read()

for fname, (start_marker, end_marker) in section_files.items():
    match = re.search(re.escape(start_marker) + r"(.*?)" + re.escape(end_marker), html, re.DOTALL)
    if match:
        code = match.group(1).strip()
        with open(f'docs/{fname}', 'w', encoding='utf-8') as outf:
            outf.write(code + '\n')
        print(f"Wrote {fname}")
    else:
        print(f"Section {fname} not found.")
