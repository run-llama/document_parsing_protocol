"""Boundary-case teaching material, all originally authored for this guide.
TeX images are rendered from the displayed encoding, then visually reviewed.
"""
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile


def extend(add, text, rect, line, page, examples, groups, dest):
    def use(slugs, ids, focus):
        for slug in slugs.split():groups[slug]={'examples':ids.split(),'focus':focus}
    def asset(path):
        data=path.read_bytes()
        return {'src':'/teaching-examples/'+path.name,'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)}
    def record(key,title,source,expected,why,language='markdown'):
        examples[key]={'id':'teaching-'+key,'name':title,'kind':'sample','constructed':True,'paragraphs':[why,'Original public-domain teaching material (CC0). Source and expected output were authored for this guide; no customer documents are used.'],'sourceImages':[asset(source)],'tables':[],'snippets':[{'language':language,'text':expected}],'rendered':'','bad':None}
    def tex(key,title,body,fence,why):
        preamble=r'\documentclass[border=12pt]{standalone}\usepackage{circuitikz}\usepackage{chemfig}\usepackage[version=4]{mhchem}\begin{document}'
        with tempfile.TemporaryDirectory(prefix='dpp-teaching-tex-') as temp:
            base=Path(temp)/key
            base.with_suffix('.tex').write_text(preamble+'\n'+body+'\n'+r'\end{document}')
            result=subprocess.run(['pdflatex','-no-shell-escape','-interaction=nonstopmode','-halt-on-error','-output-directory',temp,str(base.with_suffix('.tex'))],capture_output=True,text=True)
            if result.returncode:raise RuntimeError(key+': '+result.stdout[-2000:])
            subprocess.run(['pdftoppm','-scale-to','1000','-singlefile','-png',str(base.with_suffix('.pdf')),str(dest/key)],check=True,capture_output=True)
        record(key,title,dest/(key+'.png'),'```'+fence+'\n'+body+'\n```',why)
        examples[key]['encodingValidation']='Compiled with pdflatex and rendered with Poppler; source image is that rendering.'

    tex('circuit-divider','A resistor divider preserves the branch and values',r'''\begin{circuitikz}[american]
\draw (0,4) node[above]{VIN} to[R,l=$R1\ 10\,k\Omega$] (0,2)
  to[R,l=$R2\ 20\,k\Omega$] (0,0) node[ground]{};
\draw (0,2) node[circ]{} -- (2,2) node[right]{VOUT};
\end{circuitikz}''','diagram/circuitikz','This is a component-level circuit, not a process flow. Preserve R1, R2, their printed values, the ground symbol and the VOUT branch at the marked junction. Do not calculate an unprinted output voltage.')
    for joined in [False,True]:
        body=r'''\begin{circuitikz}
\draw (0,1) node[left]{A} -- (2,1) node[right]{B};
\draw (1,0) node[below]{D} -- (1,2) node[above]{C};
'''+(r'\node[circ] at (1,1) {};' if joined else '')+'\n'+r'\end{circuitikz}'
        tex('circuit-'+('junction' if joined else 'crossing'),'The junction dot changes connectivity' if joined else 'Crossing wires are not automatically connected',body,'diagram/circuitikz','Compare with the other crossing example: '+('the visible dot joins all four labeled ends.' if joined else 'there is no junction marker. Preserve the two crossing wires without asserting an electrical connection at their crossing.')+' Do not infer hidden connections from proximity.')
    tex('chem-reaction','A printed reaction keeps coefficients and its arrow',r'\ce{2H2 + O2 -> 2H2O}','latex','Use mhchem for a linear reaction. Preserve the printed coefficients and arrow; do not replace the reaction with its name or add conditions that are not printed.')
    tex('chem-ring','A ring needs its bond pattern',r'\chemfig{*6(-=-=-=)}','latex','The six-membered ring has three alternating double bonds. A formula such as C6H6 alone would discard the drawn structure. This is a complete chemfig encoding of the shown ring.')
    tex('chem-stereo','Solid and hashed wedges must survive',r'\chemfig{C(-[:180]H)(-[:0]Cl)(<[:90]F)(<:[:270]Br)}','latex','Preserve the solid wedge to F, hashed wedge to Br and ordinary bonds to H and Cl. Do not flatten them to four identical bonds or infer an R/S name not printed on the source.')
    tex('plan-encoding','A floor plan retains the doorway and printed dimensions',r'''\begin{tikzpicture}[x=1cm,y=1cm]
\draw[thick] (0,0) rectangle (6,4);
\draw[thick] (3,0) -- (3,1) (3,2) -- (3,4);
\draw (3,1) -- (4,1);
\draw (4,1) arc[start angle=0,end angle=90,radius=1];
\node at (1.5,2.5) {Office};
\node at (4.5,2.5) {Store};
\draw[<->] (0,-0.5) -- (6,-0.5) node[midway,below]{6.0 m};
\draw[<->] (-0.5,0) -- (-0.5,4) node[midway,left]{4.0 m};
\end{tikzpicture}''','diagram/tikz','The internal wall has a visible opening and a door swing into Store. Keep both room labels and the two printed overall dimensions. Drawing coordinates reproduce the schematic; they do not authorize invented room dimensions or calculated areas. This simple plan has a faithful encoding, so a description fallback is unnecessary.')
    use('diagrams-electrical-schematics','circuit-divider circuit-crossing circuit-junction','Start with a real component circuit, then compare the same crossing with and without a junction dot. Each expected encoding is compilable CircuiTikZ.')
    use('other-chemical-molecules','chem-reaction chem-ring chem-stereo','Compare a linear reaction, a ring and stereochemical bonds. Each source was rendered from the complete displayed mhchem or chemfig encoding.')
    use('diagrams-blueprints','plan-encoding','The first example demonstrates the preferred faithful encoding. The RFC’s larger plan remains below as its explicitly conditional description-fallback example; complexity alone does not justify choosing that fallback.')

    # Grounding uses rasterized text and measured ink boxes, not guessed SVG font metrics.
    from PIL import Image, ImageDraw, ImageFont
    font_dir=Path('/System/Library/Fonts/Supplemental')
    normal=ImageFont.truetype(str(font_dir/'Arial.ttf'),24)
    bold=ImageFont.truetype(str(font_dir/'Arial Bold.ttf'),30)
    small=ImageFont.truetype(str(font_dir/'Arial.ttf'),18)
    im=Image.new('RGB',(720,420),'white');draw=ImageDraw.Draw(im)
    rows=[('Service note',48,48,bold,0,3),('Check valve A.',48,126,normal,1,0),('Record 12 psi.',48,166,normal,1,15),('Rev B | 7',48,365,small,2,0)]
    md=['## Service note','Check valve A.\nRecord 12 psi.','Rev B | 7'];types=['Section-header','Text','Page-footer'];line_boxes={0:[],1:[],2:[]};word_boxes={0:[],1:[],2:[]}
    def bbox(coords):
        x,y,x2,y2=coords
        return {'x':round(x,2),'y':round(y,2),'w':round(x2-x,2),'h':round(y2-y,2)}
    for value,x,y,font,index,start in rows:
        draw.text((x,y),value,font=font,fill='#172033')
        line_boxes[index].append({**bbox(draw.textbbox((x,y),value,font=font)),'startIndex':start,'endIndex':start+len(value)})
        offset=0
        for word in value.split(' '):
            wx=x+draw.textlength(value[:offset],font=font)
            word_boxes[index].append({**bbox(draw.textbbox((wx,y),word,font=font)),'startIndex':start+offset,'endIndex':start+offset+len(word)})
            offset+=len(word)+1
    source=dest/'grounding-page.png';im.save(source)
    for level in ['element','line','word']:
        items=[]
        for index in range(3):
            boxes=line_boxes[index];x=min(b['x'] for b in boxes);y=min(b['y'] for b in boxes);x2=max(b['x']+b['w'] for b in boxes);y2=max(b['y']+b['h'] for b in boxes)
            item={'type':types[index],'md':md[index],'bBox':bbox((x,y,x2,y2))}
            if level!='element':item['layoutAwareBbox']=line_boxes[index] if level=='line' else word_boxes[index]
            items.append(item)
        sidecar={'pages':[{'page':1,'width':720,'height':420,'items':items}]}
        markdown='\n\n'.join('<!-- el p=1 '+ ' '.join(f'{k}={v}' for k,v in item['bBox'].items())+' -->\n'+item['md'] for item in items)
        key='grounding-'+level
        record(key,'The same service page at '+level+' granularity',source,markdown,'This interior page has a level-2 section heading, one two-line paragraph and a footer. '+level.capitalize()+' boxes were requested. The Markdown and sidecar below are separate deliverables; the footer is not part of the paragraph. Coordinates use the original 720×420 image, not its on-screen display size.')
        examples[key]['snippets'].append({'language':'json','text':json.dumps(sidecar,indent=2)})
        examples[key]['geometry']={'level':level,'markdown':markdown,'sidecar':sidecar}
        examples[key]['paragraphs'].insert(1,'QA: the second paragraph line starts at character 15 in the element Markdown. Heading word ranges start after the “## ” prefix. Returning both line and word ranges for a word-only request would violate the requested granularity.')
    use('02-principles-traceability','grounding-element grounding-word','Follow each output element back to the same service page. The footer has its own location; word character ranges refer to each element’s Markdown, including its syntax.')
    use('layout-annotation-granularity','grounding-element grounding-line grounding-word','Switch between three requests for the exact same page. Region boxes remain; finer boxes change with the requested level. The result must not mix line and word ranges.')
    use('03-output-model-the-sidecar','grounding-line grounding-word','Compare the Markdown anchors with the separate sidecar: same page, same item order, identical element boxes and character ranges into each item’s own Markdown.')

    # Visible appearance wins over extractable hidden strings.
    visibility=rect(0,0,720,300,'#000','#000')+text(40,65,'Public notice',28,'fill="white"')+text(40,115,'Meeting at 10:00.',24,'fill="white"')+text(40,160,'INVISIBLE_TOKEN',24,'fill="white" opacity="0"')+text(40,200,'LOW_CONTRAST_TOKEN',24,'fill="#010101"')+text(40,240,'TINY_TOKEN',0.01,'fill="white"')
    add('visibility','Extractable strings are not necessarily visible content',visibility,'Public notice\n\nMeeting at 10:00.','At the normal rendered size, only the white heading and meeting line are readable. The original SVG deliberately contains zero-opacity text, #010101 text on #000000 and 0.01-pixel text. Do not recover those strings by inspecting source/XML and pretend they were visible. Very small text that is genuinely readable remains content; this is not a blanket size threshold.','Public notice\n\nMeeting at 10:00.\n\nINVISIBLE_TOKEN\nLOW_CONTRAST_TOKEN\nTINY_TOKEN')
    use('02-principles-the-page-is-the-ground-truth','visibility image-text header-only','Compare visible content with hidden-but-extractable strings, then preserve an actual printed typo and avoid inventing absent table rows. Visibility is determined from the rendering, not from the presence of text objects.')

    mixed=text(40,85,'Fee: $5. Use x = 2 to continue.',24)
    add('mixed-math','Currency and inline mathematics share one sentence',mixed,'Fee: $5. Use $$x = 2$$ to continue.','The first dollar sign is a printed currency symbol. Only x = 2 is mathematics; the double delimiters prevent an unrelated currency sign from being mistaken for an equation boundary.','Fee: $$5. Use x = 2$ to continue.')
    redline=text(45,110,'Rate:')+text(130,110,'60')+line(128,102,160,102)+text(185,110,'55')+line(184,116,215,116)
    add('underline-redline','A replacement underline is not an insertion-history tag',redline,'Rate: ~~60~~ <u>55</u>','Keep the visibly struck 60 and the visibly underlined replacement 55. Do not silently discard the deleted value, infer an edit-history <ins> tag, or encode the underline as italic.','Rate: <ins>55</ins>')
    quote=rect(35,35,650,230,'#f8fafc')+text(60,80,'Safety note',28,'font-weight="bold"')+text(60,125,'Keep dry.')+rect(60,150,550,85)+line(60,190,610,190)+line(335,150,335,235)+text(75,178,'Item',20)+text(355,178,'Limit',20)+text(75,220,'Crates',20)+text(355,220,'3',20)
    add('quote-table','An inset can contain a heading and a table',quote,'## Safety note\n\nKeep dry.\n\n<table>\n<tr><th>Item</th><th>Limit</th></tr>\n<tr><td>Crates</td><td>3</td></tr>\n</table>','In this document the printed Safety note is a level-2 section heading. The inset background does not turn its contents into a Markdown block quote. Preserve the heading, paragraph and table without > prefixes.')
    add('superscript-boundary','A footnote marker and a mathematical exponent differ',text(45,95,'See note',24)+text(148,82,'2',16)+text(45,165,'Then compute x',24)+text(211,152,'2',16)+text(225,165,'.',24),'See note<sup>2</sup>\n\nThen compute $$x^{2}$$.','The first raised 2 is a note reference and uses <sup>. The second belongs to a mathematical expression and stays inside LaTeX. Do not turn both into Unicode ² or apply one markup to both.')
    use('text-1-inline-formatting-inline-equations','mixed-math equation','Distinguish printed currency from mathematics before choosing delimiters.')
    use('text-1-inline-formatting-underlined-text','underline-redline underline separator','Compare an underlined replacement, an ordinary underline and a printed divider. Their positions and roles determine the output.')
    use('text-1-inline-formatting-quote-blocks','quote-table quote','First preserve a real heading and table inside an inset, then handle a simple quotation. Flatten the visual container without flattening its internal structure.')
    use('text-1-inline-formatting-superscript-and-subscript','superscript-boundary super-sub','Raised text can be a reference marker or part of an equation. The two cases use different representations.')
    # Identical source, explicit request changes. Target is metadata, not visible text.
    linksource=text(45,100,'Read the handbook',26)
    add('link-default','Default: preserve the visible anchor text',linksource,'Read the handbook','The document link target is https://example.org/handbook, supplied as link metadata, not printed on the page. Link extraction is OFF. Keep only the visible anchor text; do not append the hidden URL.','Read the handbook https://example.org/handbook')
    add('link-enabled','Link extraction requested: retain the actual target',linksource,'[Read the handbook](https://example.org/handbook)','Same printed source and metadata as the previous case. Link extraction is explicitly ON. The URL is supplied document metadata for this constructed example; it is not inferred from the words or recoverable from the picture alone.')
    use('text-1-inline-formatting-links','link-default link-enabled link','Switch between identical sources with link extraction OFF and ON. The hidden target is explicitly supplied as document metadata, never guessed from pixels.')
    footer=text(45,95,'Inspection complete.')+text(45,270,'Field notes · Page iv',18)
    for enabled in [False,True]:
        key='folio-'+('enabled' if enabled else 'default')
        add(key,'Printed folio extraction '+('ON' if enabled else 'OFF'),footer,'Inspection complete.\n\nField notes · Page iv','The printed page number is iv, even though this is physical sheet 1. '+('Separate folio extraction is requested. The JSON snippet is a page-metadata excerpt, not a complete sidecar or additional document text.' if enabled else 'Separate folio extraction is not requested. The printed folio still survives in its footer band.'))
        if enabled:examples[key]['snippets'].append({'language':'json','text':'{"page": 1, "printedPageNumber": "iv"}'})
    mark='<path d="M70 155 L130 45 L190 155 Z" fill="#2563eb"/>'+text(220,130,'NORTH',38)
    add('mark-default','Graphic references OFF: preserve the mark’s content',mark,'NORTH — a blue triangular mark.','This fictional logo contains the printed word NORTH and a blue triangle. With saved-graphic references OFF, put that content into the text stream.')
    add('mark-enabled','Graphic references ON: an explicit saved-image option',mark,'![NORTH — a blue triangular mark](/teaching-examples/mark-enabled.svg)','Same fictional logo. Saved-graphic references are explicitly allowed by the request under the open Output Options rule. The local target is the actual packaged source, not an invented remote file. This permission does not apply to the default Images rule.')
    fragment1=rect(45,50,630,110)+line(45,105,675,105)+line(405,50,405,160)+text(65,85,'Item')+text(430,85,'Count')+text(65,140,'Pencils')+text(430,140,'12')
    fragment2=rect(45,50,630,110)+line(45,105,675,105)+line(405,50,405,160)+text(65,85,'Item')+text(430,85,'Count')+text(65,140,'Pens')+text(430,140,'7')
    first='<table><tr><th>Item</th><th>Count</th></tr><tr><td>Pencils</td><td>12</td></tr></table>'
    second='<table><tr><th>Item</th><th>Count</th></tr><tr><td>Pens</td><td>7</td></tr></table>'
    joined='<table><tr><th>Item</th><th>Count</th></tr><tr><td>Pencils</td><td>12</td></tr><tr><td>Pens</td><td>7</td></tr></table>'
    second_path=dest/'option-table-page-two.svg';second_path.write_text(page(fragment2))
    for enabled in [False,True]:
        key='table-join-'+('enabled' if enabled else 'default')
        add(key,'Cross-page table joining '+('ON' if enabled else 'OFF'),fragment1,joined if enabled else first+'\n\n---\n\n'+second,'These are consecutive pages of one continued table, supplied in order. '+('The request explicitly permits joining. This snippet shows the joined-table representation; it is not an example of a page-preserving sidecar. The repeated header is retained once.' if enabled else 'Joining is OFF. Keep each fragment with its printed header and use --- between the two source pages.'))
        examples[key]['sourceImages'].append(asset(second_path))
    use('03-output-model-output-options','folio-default folio-enabled mark-default mark-enabled table-join-default table-join-enabled','Compare the same inputs under three request settings: separate folio extraction, saved-graphic references and cross-page table joining. The continued-title variant uses the same joining option; any printed “continued” marker must also be retained. These illustrate the existing open rule without making it settled.')

    use('images-images','image-text image-table image-chart image-flow image-art','Choose the representation from the content inside an image. This page covers classification; Images and Figures covers keeping that content in the surrounding page.')
    combined=text(45,40,'Before the process, register.')+rect(45,80,200,65)+text(68,120,'Receive')+line(245,112,400,112)+'<path d="M390 105 L400 112 L390 119" fill="none" stroke="#334155"/>'+rect(400,80,200,65)+text(430,120,'Review')+text(45,205,'Figure 1. Intake workflow',20)+text(45,260,'After review, send a receipt.')
    add('figure-context','A diagram stays between its surrounding paragraphs',combined,'Before the process, register.\n\n```diagram/mermaid\nflowchart LR\n  A[Receive] --> B[Review]\n```\n\nFigure 1. Intake workflow\n\nAfter review, send a receipt.','Keep reading order: paragraph, diagram, caption, paragraph. The printed caption is ordinary adjacent text, not a new document heading. Do not move the figure to the end or replace it with a filename.')
    use('images-images-and-figures','figure-context quote-table equation','Integrate a figure into the page: preserve surrounding prose, its caption, internal structure and mathematical content. For the basic choice between text, table, chart, diagram and artwork, see Images.')

    mixedform=text(40,40,'CONTACT',24,'font-weight="bold"')+text(400,40,'PAYMENT',24,'font-weight="bold"')+text(40,95,'A Name: Ada')+text(400,95,'1 Amount: 12.50')+text(40,155,'B City: Dover')+text(400,155,'2 Code: 007')
    add('form-sections','Lettered and numbered sections do not interleave',mixedform,'### CONTACT\n\n- \\[A\\] **Name:** Ada\n- \\[B\\] **City:** Dover\n\n### PAYMENT\n\n- \\[1\\] **Amount:** 12.50\n- \\[2\\] **Code:** 007','The page prints two distinct section headings. Complete CONTACT’s A/B sequence, then PAYMENT’s 1/2 sequence. Do not produce A, 1, B, 2 or invent a common wrapper around the sections.')
    use('forms-3-structure-form-reading-order','form-sections form-order','Compare separate lettered/numbered sections with a single numbered sequence. Printed grouping and IDs govern field order, not a row-wise scan.')
    use('forms-3-structure-sections-and-grouped-fields','form-sections','Only the printed CONTACT and PAYMENT headings create groups. The output keeps each field sequence inside its actual section.')

    # Turn appendix pages into explicit workflows with an audit trail, not just reused pictures.
    workflows={
      'inline-formatting':('underline-redline',['Locate the crossed-out 60 and underlined 55.','Transcribe both values before adding markup.','Apply strikeout to 60 and underline to 55 only.','QA correction: reject “Rate: 55”, which silently drops printed deleted content.']),
      'lists-and-forms':('form-sections',['Identify the two printed section bands.','Transcribe each label, ID and value without normalizing 007.','Order A/B inside CONTACT and 1/2 inside PAYMENT.','QA correction: reject an A,1,B,2 interleaving produced by row-first geometry.']),
      'marks-on-the-page':('table-correction',['Locate the original cell value and its correction.','Keep the struck value before the replacement.','Place the REVIEWED stamp outside the table.','QA correction: do not attach the stamp to the nearest cell.']),
      'images-diagrams-and-other':('circuit-divider',['Classify the figure as an electrical circuit.','Inventory printed designators, values and net labels.','Encode the two resistors and the branch at the junction.','QA correction: remove any calculated VOUT voltage; the source prints none.']),
      'layout':('grounding-word',['Separate heading, two-line body and footer.','Transcribe Markdown in reading order.','Measure element and requested word boxes in source coordinates.','QA correction: second-line character offsets include the newline; heading offsets include “## ”.']),
      'headings-and-page-structure':('document-page-one',['Read both pages before deciding heading depth.','Keep FIELD GUIDE as recurring furniture on these interior pages.','Continue subsection depth on the second page.','QA correction: remove the invented top-level heading caused by restarting at each page.']),
      'charts':('image-chart',['Read the printed title, categories and numeric labels.','Use the printed values 4 and 8; do not estimate them from pixels.','Write a chart table with its caption.','QA correction: replace a trend-only sentence with all printed data points.']),
      'tables-1-3':('header-only',['Inspect the entire available crop and check for an available continuation.','Confirm that this example has headers but no body or joinable page.','Transcribe the header text as ordinary text.','QA correction: remove the empty HTML table; do not fabricate a body.']),
      'tables-4-8':('table-correction',['Read the grid and each cell boundary.','Preserve the original and replacement values in the same cell.','Keep the stamp outside the grid.','QA correction: do not silently substitute the new value or create a stamp column.']),
    }
    for suffix,(key,steps) in workflows.items():
        slug='c-producing-ground-truth-ground-truth-'+suffix
        use(slug,key,'Worked annotation workflow: read the source, make the structural decisions, produce the output, then correct the tempting error.')
        groups[slug]['workflow']=steps
    for slug in ['c-producing-ground-truth-producing-ground-truth','c-producing-ground-truth-the-annotation-qa-checklist']:
        use(slug,'form-sections header-only','Walk through a successful annotation and a tempting but invalid table construction. Compare the decisions with the exact output.')
        groups[slug]['workflow']=['Start from the rendered source, not from a parser prediction.','Inventory visible text and structural relationships.','Choose the applicable conventions and produce their prescribed encoding.','Compare every output value and structure with its source; reject invented groups and silently dropped content.']
