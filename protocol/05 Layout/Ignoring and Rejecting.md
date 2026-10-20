---
title: Ignoring and Rejecting
rule_id: layout-ignoring-and-rejecting
status: rule
scope: page
tags: [rule, layout, blocks]
---

# Ignoring and Rejecting

> [!success] ✅ Normative
> A visible region MAY be left out of the output only on the narrow grounds listed below, and a
> page MAY be declared unrepresentable only when the problem is the page itself. Content that is
> merely difficult to read MUST NOT be left out on either ground.

Two exclusions, for two different situations. Both are narrow. Visibility is determined by
[[The Page Is the Ground Truth]], including hidden text, microscopic text and imperceptible
contrast. A visibly present but unreadable text span is represented as `[illegible]`; it is not
an invisible source object.

## Excluding one region

A bounded region of an otherwise sound page MAY be left out of the output — no element, no box —
only when it is:

- a scan artifact;
- an invisible source object;
- damaged content;
- an irreconcilable source error;
- an element explicitly out of scope;
- a genuinely unresolved ambiguity.

Ordinary logos, page numbers, and content that is difficult but readable MUST NOT be excluded.
That is the requirement that matters. Exclusion is not a way past a hard page: a dense figure, an
awkward multi-column spread and a badly kerned table are all representable, just slower. Excluding
them turns a slow page into missing data, silently — the **never drop** failure.

## An unrepresentable page

A page MAY be declared unrepresentable, and left out of evaluation rather than represented in part,
only when it is corrupt, badly cropped, mismatched to its document, unusable, or cannot be
represented unambiguously. An unrepresentable page MUST NOT be given a partial or guessed
rendering.

## Choosing between them

The test is **scope**. One bad region on an otherwise sound page: that region is excluded and the
rest of the page represented. A page where the problem is the page: the page is declared
unrepresentable. Excluding twenty regions to rescue a broken page MUST NOT be done — it is a
rejection in disguise, and it produces an output that looks complete and is not.

## A page that is genuinely blank

A page with **no ink at all** MUST keep its position in the page sequence with **zero elements**.
Its Markdown MUST consist of the single line `<!-- blank page -->` between the two `---` separators
that bound it, and its sidecar entry MUST list no items.

```text
…end of page 1

---

<!-- blank page -->

---

Start of page 3…
```

Blank pages are ordinary in real documents — section breaks, duplex backs, deliberate spacers. A
three-page file whose second page carries no ink and no text is not corrupt, and declaring it
unrepresentable would misreport the document's length.

Neither exclusion fits:

- **Excluding a region** is for a bounded exception *within* a page. Here there is nothing to
  bound.
- **Unrepresentable** is for a page that cannot be represented. A blank page represents perfectly —
  as nothing.

The page MUST NOT be dropped — a missing page is far harder to notice than an empty one, and every
later page number would shift. It MUST NOT be given an element either: an "empty" element with a
box around nothing is invented. The comment says, inline and invisibly, that the page is blank on
purpose, so a reader of the Markdown can tell a blank page from a lost one.

A page that prints only a notice such as *"This page intentionally left blank"*, or only a folio or
running header, has ink: it is an ordinary page whose content is that text.

### ✅ **Sample** — dense but readable

![[bag-security-cover-letter-tier.png]]

A landscape security-cover statement with sixteen columns, a `Column A … Column P` letter tier over
two further header rows, and body text too small to read at page scale. It is slow, not impossible:
every cell resolves under zoom, so nothing here is grounds to exclude a region or declare the page
unrepresentable. The corner wordmark `Caldrivane` is an ordinary logo and is kept. The three ratio
rows at the bottom merge their label across columns A–J and print no cell under Column P.

<details>
<summary>Expected Markdown</summary>

```markdown
Caldrivane Financial Services Limited
Annexure A (ii)

[logo: Caldrivane]

**Statement of Security Cover on standalone basis as per the terms of Debenture Trust Deeds and Information Memorandum and book value of assets as at 30 June 2026**

Rupees in Crores

<table>
  <tr> <th>Column A</th> <th>Column B</th> <th>Column C</th> <th>Column D</th> <th>Column E</th> <th>Column F</th> <th>Column G</th> <th>Column H</th> <th>Column I</th> <th>Column J</th> <th>Column K</th> <th>Column L</th> <th>Column M</th> <th>Column N</th> <th>Column O</th> <th>Column P</th> </tr>
  <tr> <th>Particulars</th> <th>Description of asset for which this certificate relate</th> <th>Exclusive Charge</th> <th>Exclusive Charge</th> <th>Pari-Passu Charge</th> <th>Pari-Passu Charge</th> <th>Pari-Passu Charge - Exclusive</th> <th>Pari-Passu Charge</th> <th>Assets not offered as Security</th> <th>Elimination (amount in negative)</th> <th>(Total C to I)</th> <th colspan="5">Related to only those items covered by this certificate</th> </tr>
  <tr> <th></th> <th></th> <th>Debt for which this certificate being issued</th> <th>Other Secured Debt</th> <th>Debt for which this certificate being issued</th> <th>Assets shared by pari passu debt holder (includes debt for which issued & other debt with pari-passu charge)</th> <th>Other assets on which there is pari-passu charge (excluding items covered in column F)</th> <th>debt amount considered more than once (due to exclusive plus pari passu charge)</th> <th></th> <th></th> <th></th> <th>Market Value for Assets charged on Exclusive basis</th> <th>Market Value for Pari passu charge Assets</th> <th>Carrying/book value for exclusive charge assets where market value is not ascertainable</th> <th>Market Value for Pari passu charge Assets - Exclusive</th> <th>Total Value (=K+L+M+N)</th> </tr>
  <tr> <td>ASSETS</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Property, Plant and Equipment</td> <td></td> <td></td> <td></td> <td>No</td> <td></td> <td></td> <td></td> <td>0.22</td> <td></td> <td>0.22</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Intangible Assets</td> <td></td> <td></td> <td></td> <td>No</td> <td></td> <td></td> <td></td> <td>13.40</td> <td></td> <td>13.40</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Investments</td> <td>Investments (Refer Note 2 & 3)</td> <td></td> <td></td> <td>Yes</td> <td>4,180.55</td> <td></td> <td></td> <td>5,910.02</td> <td></td> <td>10,090.57</td> <td>1,905.00</td> <td>975.10</td> <td></td> <td>85.60</td> <td>1,477.03</td> </tr>
  <tr> <td>Loans</td> <td>Receivables</td> <td>1,340.20</td> <td></td> <td>Yes</td> <td>802.55</td> <td>90.10</td> <td></td> <td>410.75</td> <td></td> <td>2,643.60</td> <td>1,340.20</td> <td>802.55</td> <td></td> <td>90.10</td> <td>2,232.85</td> </tr>
  <tr> <td>Trade Receivables</td> <td></td> <td></td> <td></td> <td>No</td> <td></td> <td></td> <td></td> <td>12.05</td> <td></td> <td>12.05</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Cash and Cash Equivalents</td> <td></td> <td></td> <td></td> <td>No</td> <td></td> <td></td> <td></td> <td>78.90</td> <td></td> <td>78.90</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Others</td> <td></td> <td></td> <td></td> <td>No</td> <td></td> <td></td> <td></td> <td>450.10</td> <td></td> <td>450.10</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td><strong>Total</strong></td> <td></td> <td><strong>1,340.20</strong></td> <td></td> <td></td> <td><strong>4,983.10</strong></td> <td><strong>90.10</strong></td> <td></td> <td><strong>6,865.44</strong></td> <td></td> <td><strong>13,278.84</strong></td> <td><strong>1,905.00</strong></td> <td><strong>1,777.65</strong></td> <td></td> <td><strong>90.10</strong></td> <td><strong>2,232.85</strong></td> </tr>
  <tr> <td>LIABILITIES</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Debt securities</td> <td></td> <td>1,300.60</td> <td></td> <td>Yes</td> <td>1,905.00</td> <td>82.30</td> <td></td> <td></td> <td></td> <td>3,287.90</td> <td>1,300.60</td> <td>1,905.00</td> <td></td> <td>82.30</td> <td>3,287.90</td> </tr>
  <tr> <td>Other Debt</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>41.50</td> <td></td> <td></td> <td>41.50</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td>Trade payables & others*</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td>(58.40)</td> <td></td> <td></td> <td>(58.40)</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>
  <tr> <td><strong>Total</strong></td> <td></td> <td><strong>1,300.60</strong></td> <td></td> <td></td> <td><strong>1,905.00</strong></td> <td><strong>82.30</strong></td> <td><strong>(16.90)</strong></td> <td></td> <td></td> <td><strong>3,270.99</strong></td> <td><strong>1,300.60</strong></td> <td><strong>1,905.00</strong></td> <td></td> <td><strong>82.30</strong></td> <td><strong>3,287.90</strong></td> </tr>
  <tr> <td colspan="10"><strong>Cover on Book Value</strong></td> <td></td> <td></td> <td></td> <td></td> <td><strong>1.10</strong></td> </tr>
  <tr> <td colspan="10"><strong>Cover on Market Value</strong></td> <td></td> <td><strong>1.46</strong></td> <td><strong>0.93</strong></td> <td></td> <td><strong>1.09</strong></td> </tr>
  <tr> <td colspan="10"><strong>Security Cover Ratio</strong></td> <td></td> <td><strong>1.46</strong></td> <td><strong>0.93</strong></td> <td></td> <td><strong>1.09</strong></td> </tr>
</table>

\*IND-AS adjustment for effective interest rate on secured debt securities is excluded from assets cover computation being an accounting adjustment and accordingly the asset cover is computed on a gross basis

**Caldrivane Financial Services Limited**
Corporate Identity Number: L99999MH1995PLC094641
Registered Office: Caldrivane House, off. Carlow Road, Kalina, Mumbai - 400 098 Tel No.: +91 022 4079 5199
Email ID: cs@caldrivanefin.example Website: www.caldrivanefin.example
```

</details>

### ✅ **Sample** — a scan mark that is not content

![[bag-scan-hole-mark.png]]

A scanned typewritten memorandum with a small ring printed below the text, where a hole punch or a
scanner roller left its mark. The ring is the bounded exception allowed above: it has no element
and no box, and the rest of the page is represented, down to the folio `- 63 -`.

<details>
<summary>Expected Markdown</summary>

```markdown
CALDRIVANE ENERGY CORP.
INTEROFFICE MEMORANDUM

TO: Finance Committee
FROM: R. Donovan, Treasury
DATE: November 4, 2001
RE: Off-Balance-Sheet Treatment — Borvika Partners

This memorandum summarizes the accounting treatment applied to Borvika Partners, L.P., a related-party investment vehicle organized to acquire certain merchant assets that the Company did not wish to consolidate. Under the structuring in place, an outside investor holds a three-percent equity interest, which under the applicable accounting guidance is treated as sufficient independent equity at risk to keep the vehicle's assets and liabilities off the Company's consolidated balance sheet.

The Company has, however, guaranteed certain of Borvika's obligations through a series of put and forward arrangements tied to the Company's own stock. Should the Company's share price fall below the thresholds specified in those arrangements, the Company would be required to issue additional shares or make cash payments to Borvika's outside investors, which could require the vehicle's assets to be consolidated retroactively.

Management believes the three-percent threshold continues to satisfy the applicable accounting literature, and that the exposure described above, while real, is not probable of being triggered under current pricing. We recommend the Committee note this exposure for quarterly review rather than for immediate balance-sheet recognition, and that Treasury continue to monitor the share-price thresholds monthly.

\- 63 -
```

</details>

<!-- skill:generate
- Leave a region out only if it is a scan artifact (hole-punch ring, roller mark), damaged beyond reading, invisible in the source, or explicitly out of scope. Never leave out logos, page numbers or content that is merely small, dense or awkward.
- A page with no ink at all stays in the output: between its --- separators write only <!-- blank page -->; never drop it and never add any other element for it.
-->

<!-- skill:check
- FAIL (MUST) if a logo, a page number or readable content (however dense or small) is missing from the Markdown.
- FAIL (MUST) if a scan artifact such as a hole-punch ring is rendered as content.
- FAIL (MUST) if a page with no ink is missing from the page sequence, or its Markdown is anything other than <!-- blank page -->.
- FAIL (MUST) if <!-- blank page --> appears on a page that has ink.
-->

## Related

- [[Block Annotation]] — every other region gets an element
- [[Reading Order]] — excluded regions take no position in it
- [[Never Drop, Never Invent]] — why exclusion is narrow
- [[Logos]] — an ordinary logo is content, never an exclusion
