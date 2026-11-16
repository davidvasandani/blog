{% if snake_case_section_title == "projects" %}
#pagebreak(weak: true)
{% endif %}
#industrial-section([{{ section_title }}])
{% if entry_type == "OneLineEntry" %}
#grid(columns: (1fr, 1fr), column-gutter: 24pt, row-gutter: 10pt,
{% endif %}
{% if entry_type == "ReversedNumberedEntry" %}
#reversed-numbered-entries([
{% endif %}
