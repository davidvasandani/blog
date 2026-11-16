// RenderCV's processed text uses these link helpers. Keep real PDF annotations.
#let link(dest, body, icon: false, if-underline: false, if-color: false) = std.link(dest, body)
#let connection-with-icon(icon, body) = {
  let labels = (linkedin: "LinkedIn", github: "GitHub", mastodon: "Mastodon")
  if icon in labels { [#labels.at(icon): #body] } else { body }
}
#set document(title: "{{ settings.pdf_title }}", author: "{{ cv._plain_name }}")
// Industrial Grid: shared typography and a repeating masthead on every page.
#let slate = rgb("344454")
#let ink = rgb("242b31")
#set text(font: "Work Sans", size: 10pt, fill: ink, top-edge: 0.8em, bottom-edge: 0.2em)
#set par(justify: false, leading: 5pt, spacing: 5pt)
#set list(indent: 11pt, body-indent: 3pt, tight: false, spacing: 5pt, marker: text(fill: slate)[•])
#set page(
  paper: "us-letter",
  margin: (top: 185pt, bottom: 62pt, left: 48pt, right: 48pt),
  header-ascent: 0pt,
  header: block(height: 185pt)[
    #v(0pt)
    #text(font: "JetBrains Mono", weight: "bold", size: 28pt)[{{ cv.name }}]
    #v(9pt)
    #text(size: 12pt, weight: "bold", fill: slate)[{{ cv.headline }}]
    #v(8pt)
    #text(size: 8.5pt)[
      {% for connection in cv._connections %}
      {{ connection }}{% if not loop.last %} #h(8pt) {% endif %}
      {% endfor %}
    ]
    #v(27pt)
    #line(length: 100%, stroke: 0.6pt + slate)
  ],
  footer-descent: 18pt,
  footer: [
    #line(length: 100%, stroke: 0.5pt + rgb("d7dcdf"))
    #v(6pt)
    #text(size: 8pt, fill: rgb("58616a"))[#{{ cv._footer }}]
  ],
)
#let industrial-section(title, numbered: true) = {
  if numbered { counter("industrial-sections").step() }
  block(sticky: true, above: 10pt, below: 10pt)[
    #grid(columns: (26pt, 1fr), column-gutter: 10pt, align: horizon,
      rect(width: 26pt, height: 18pt, fill: slate, stroke: none)[
        #align(center + horizon, text(font: "JetBrains Mono", size: 8pt, fill: white, weight: "bold")[
          #context { let n = counter("industrial-sections").get().first(); if n < 10 { [0] }; str(n) }
        ])
      ],
      text(size: 10pt, weight: "bold", fill: slate, upper(title)),
    )
  ]
}
