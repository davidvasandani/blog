// Keep the first two recent roles together, as in the selected design.
#counter("industrial-roles").step()
#context if counter("industrial-roles").get().first() == 3 {
  pagebreak(weak: true)
  industrial-section([Experience], numbered: false)
}
#block(breakable: {{ design.entries.allow_page_break|lower }}, above: 0pt, below: 10pt)[
  #block(sticky: true, below: 5pt)[
    #text(size: 11.1pt, weight: "bold", fill: slate)[{{ entry.position }}]
    #v(3pt)
    #text(size: 8.7pt, fill: rgb("505b65"))[
      {% if entry.company is defined %}{{ entry.company }} · {% endif %}
      {{ entry.date_and_location_column.splitlines()|reverse|join(" · ") }}
    ]
  ]
{% if entry.summary %}
  {{ entry.summary }}

{% endif %}
{% for highlight in entry.highlights or [] %}
  - {{ highlight }}
{% endfor %}
]
