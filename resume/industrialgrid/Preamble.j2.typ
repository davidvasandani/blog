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
  margin: (top: 150pt, bottom: 62pt, left: 48pt, right: 48pt),
  header-ascent: 0pt,
  header: block(height: 150pt)[
    #grid(
      columns: (1fr, 190pt),
      column-gutter: 24pt,
      align: top,
      [
        #text(font: "JetBrains Mono", weight: "bold", size: 24pt)[{{ cv.name }}]
        #v(10pt)
        #text(size: 12pt, weight: "bold", fill: slate)[{{ cv.headline }}]
      ],
      block(inset: (left: 14pt), stroke: (left: 0.5pt + rgb("d7dcdf")))[
        #set text(size: 8.5pt)
        #set par(leading: 3pt, spacing: 4pt)
        {% for connection in cv._connections %}
        #box[{{ connection }}]

        {% endfor %}
      ],
    )
    #v(20pt)
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
