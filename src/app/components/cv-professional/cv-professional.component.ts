import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CvDataService, CvDocument, CvLanguage } from '../../services/cv-data.service';

@Component({
  selector: 'app-cv-professional',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-professional.component.html',
  styleUrl: './cv-professional.component.css'
})
export class CvProfessionalComponent {
  private readonly cvDataService = inject(CvDataService);

  readonly originalPdfHref = 'assets/cv/Oscar_Ramirez_Aguilar_FullStack_DotNet_Angular_CV.pdf.pdf';
  readonly availableLanguages: CvLanguage[] = ['es', 'en'];

  activeLanguage: CvLanguage = 'es';
  cvDocument: CvDocument = this.cvDataService.getDocument(this.activeLanguage);

  setLanguage(language: CvLanguage): void {
    if (language === this.activeLanguage) {
      return;
    }

    this.activeLanguage = language;
    this.cvDocument = this.cvDataService.getDocument(language);
  }

  async exportPdf(): Promise<void> {
    if (this.activeLanguage === 'es') {
      this.downloadFromUrl(this.originalPdfHref, 'Oscar_Ramirez_Aguilar_FullStack_DotNet_Angular_CV.pdf.pdf');
      return;
    }

    await this.downloadGeneratedPdf();
  }

  downloadWord(): void {
    const documentHtml = this.buildExportDocument('word');
    const blob = new Blob([documentHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${this.cvDocument.fileStem}.doc`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  get projectRepositoryLabel(): string {
    return this.activeLanguage === 'es' ? 'Repositorio' : 'Repository';
  }

  get projectLiveLabel(): string {
    return this.activeLanguage === 'es' ? 'Sitio' : 'Live';
  }

  get activePdfLabel(): string {
    return this.activeLanguage === 'es' ? 'Descargar PDF en espanol' : 'Download PDF in English';
  }

  get activeExportHint(): string {
    return this.activeLanguage === 'es'
      ? 'Descarga el PDF original del CV o exporta una version en Word del idioma seleccionado.'
      : 'Download the English CV as a PDF file generated directly in the browser, or export it as Word.';
  }

  get activeWordLabel(): string {
    return this.activeLanguage === 'es' ? 'Descargar Word en espanol' : 'Download Word in English';
  }

  private buildExportDocument(mode: 'print' | 'word'): string {
    const doc = this.cvDocument;
    const printScript =
      mode === 'print'
        ? `<script>
            window.addEventListener('load', () => {
              window.print();
            });
          </script>`
        : '';

    return `<!doctype html>
<html lang="${doc.language}">
  <head>
    <meta charset="utf-8">
    <title>${this.escapeHtml(doc.fileStem)}</title>
    <style>
      body {
        margin: 0;
        color: #1f2937;
        background: #ffffff;
        font-family: "Segoe UI", Arial, sans-serif;
        line-height: 1.55;
      }
      main {
        max-width: 900px;
        margin: 0 auto;
        padding: 32px;
      }
      header {
        border-bottom: 2px solid #d4d8e4;
        padding-bottom: 20px;
        margin-bottom: 28px;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 28px;
      }
      h2 {
        margin: 0 0 14px;
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #334155;
      }
      h3 {
        margin: 0;
        font-size: 16px;
      }
      p {
        margin: 0 0 12px;
      }
      ul {
        margin: 0;
        padding-left: 18px;
      }
      li + li {
        margin-top: 6px;
      }
      section {
        margin-top: 28px;
      }
      .meta {
        margin: 0 0 8px;
        color: #475569;
        font-weight: 600;
      }
      .contact-list,
      .skill-grid,
      .language-list {
        display: grid;
        gap: 14px;
      }
      .contact-list,
      .skill-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .experience-item,
      .project-item,
      .education-item,
      .cert-item,
      .reference-item {
        margin-bottom: 20px;
      }
      .tech-list {
        padding-left: 0;
        list-style: none;
      }
      .tech-list li {
        display: inline;
      }
      .tech-list li:not(:last-child)::after {
        content: " / ";
        color: #64748b;
      }
      a {
        color: #0f766e;
        text-decoration: none;
      }
      @media print {
        main {
          padding: 20px;
        }
      }
    </style>
    ${printScript}
  </head>
  <body>
    <main>
      <header>
        <h1>${this.escapeHtml(doc.name)}</h1>
        <p class="meta">${this.escapeHtml(doc.headline)}</p>
        <p>${this.escapeHtml(doc.location)}</p>
      </header>
      ${this.renderContactSection(doc)}
      ${this.renderProfileSection(doc)}
      ${this.renderSkillsSection(doc)}
      ${this.renderExperienceSection(doc)}
      ${this.renderEducationSection(doc)}
      ${this.renderCertificationsSection(doc)}
      ${this.renderProjectsSection(doc)}
      ${this.renderLanguagesSection(doc)}
      ${this.renderReferencesSection(doc)}
    </main>
  </body>
</html>`;
  }

  private renderContactSection(doc: CvDocument): string {
    return `<section>
      <h2>${this.escapeHtml(doc.labels.contact)}</h2>
      <div class="contact-list">
        ${doc.contactLinks
          .map((item) => `<p><strong>${this.escapeHtml(item.label)}:</strong> ${this.renderValue(item.value, item.href)}</p>`)
          .join('')}
      </div>
    </section>`;
  }

  private renderProfileSection(doc: CvDocument): string {
    return `<section>
      <h2>${this.escapeHtml(doc.labels.profile)}</h2>
      ${doc.profile.map((paragraph) => `<p>${this.escapeHtml(paragraph)}</p>`).join('')}
    </section>`;
  }

  private renderSkillsSection(doc: CvDocument): string {
    return `<section>
      <h2>${this.escapeHtml(doc.labels.technicalSkills)}</h2>
      <div class="skill-grid">
        ${doc.skillCategories
          .map(
            (category) => `<article>
              <h3>${this.escapeHtml(category.title)}</h3>
              <ul>
                ${category.items.map((item) => `<li>${this.escapeHtml(item)}</li>`).join('')}
              </ul>
            </article>`
          )
          .join('')}
      </div>
    </section>`;
  }

  private renderExperienceSection(doc: CvDocument): string {
    return `<section>
      <h2>${this.escapeHtml(doc.labels.experience)}</h2>
      ${doc.experience
        .map(
          (item) => `<article class="experience-item">
            <h3>${this.escapeHtml(item.role)} | ${this.escapeHtml(item.company)}</h3>
            <p class="meta">${this.escapeHtml(item.period)} | ${this.escapeHtml(item.location)}</p>
            <p>${this.escapeHtml(item.summary)}</p>
            <p><strong>${this.escapeHtml(doc.labels.achievements)}:</strong></p>
            <ul>
              ${item.achievements.map((achievement) => `<li>${this.escapeHtml(achievement)}</li>`).join('')}
            </ul>
            <p><strong>${this.escapeHtml(doc.labels.technologies)}:</strong></p>
            <ul class="tech-list">
              ${item.technologies.map((technology) => `<li>${this.escapeHtml(technology)}</li>`).join('')}
            </ul>
          </article>`
        )
        .join('')}
    </section>`;
  }

  private renderEducationSection(doc: CvDocument): string {
    return `<section>
      <h2>${this.escapeHtml(doc.labels.education)}</h2>
      ${doc.education
        .map(
          (item) => `<article class="education-item">
            <h3>${this.escapeHtml(item.degree)}</h3>
            <p class="meta">${this.escapeHtml(item.institution)} | ${this.escapeHtml(item.period)}</p>
          </article>`
        )
        .join('')}
    </section>`;
  }

  private renderCertificationsSection(doc: CvDocument): string {
    return `<section>
      <h2>${this.escapeHtml(doc.labels.certifications)}</h2>
      ${doc.certifications
        .map(
          (item) => `<article class="cert-item">
            <h3>${this.escapeHtml(item.title)}</h3>
            <p>${this.escapeHtml(item.issuer)}${item.credentialUrl ? ` | ${this.renderValue(item.credentialUrl, item.credentialUrl)}` : ''}</p>
          </article>`
        )
        .join('')}
    </section>`;
  }

  private renderProjectsSection(doc: CvDocument): string {
    const repositoryLabel = doc.language === 'es' ? 'Repositorio' : 'Repository';
    const liveLabel = doc.language === 'es' ? 'Sitio' : 'Live';

    return `<section>
      <h2>${this.escapeHtml(doc.labels.projects)}</h2>
      ${doc.projects
        .map(
          (item) => `<article class="project-item">
            <h3>${this.escapeHtml(item.title)}</h3>
            <p>${this.escapeHtml(item.summary)}</p>
            <p><strong>${this.escapeHtml(doc.labels.technologies)}:</strong> ${item.technologies.map((technology) => this.escapeHtml(technology)).join(', ')}</p>
            <p>
              ${item.repositoryUrl ? `${this.escapeHtml(repositoryLabel)}: ${this.renderValue(item.repositoryUrl, item.repositoryUrl)}` : ''}
              ${item.repositoryUrl && item.liveUrl ? ' | ' : ''}
              ${item.liveUrl ? `${this.escapeHtml(liveLabel)}: ${this.renderValue(item.liveUrl, item.liveUrl)}` : ''}
            </p>
          </article>`
        )
        .join('')}
    </section>`;
  }

  private renderLanguagesSection(doc: CvDocument): string {
    return `<section>
      <h2>${this.escapeHtml(doc.labels.languages)}</h2>
      <div class="language-list">
        ${doc.languages.map((item) => `<p><strong>${this.escapeHtml(item.name)}:</strong> ${this.escapeHtml(item.level)}</p>`).join('')}
      </div>
    </section>`;
  }

  private renderReferencesSection(doc: CvDocument): string {
    return `<section>
      <h2>${this.escapeHtml(doc.labels.references)}</h2>
      ${doc.references
        .map(
          (item) => `<article class="reference-item">
            <h3>${this.escapeHtml(item.name)}</h3>
            <p>${this.escapeHtml(item.role)} | ${this.escapeHtml(item.company)}</p>
            ${item.focus ? `<p>${this.escapeHtml(item.focus)}</p>` : ''}
            ${item.contact ? `<p>${this.renderValue(item.contact, `mailto:${item.contact}`)}</p>` : ''}
          </article>`
        )
        .join('')}
    </section>`;
  }

  private renderValue(value: string, href?: string): string {
    const safeValue = this.escapeHtml(value);

    if (!href) {
      return safeValue;
    }

    return `<a href="${this.escapeHtml(href)}">${safeValue}</a>`;
  }

  private escapeHtml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  private downloadFromUrl(url: string, fileName: string): void {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
  }

  private downloadBlob(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = fileName;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private async downloadGeneratedPdf(): Promise<void> {
    const pdfMakeModule = await import('pdfmake/build/pdfmake');
    const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
    const pdfMake = (pdfMakeModule as { default?: unknown }).default ?? pdfMakeModule;
    const pdfFonts = (pdfFontsModule as { default?: unknown }).default ?? pdfFontsModule;
    const printer = pdfMake as {
      vfs?: Record<string, string>;
      createPdf: (definition: object) => { download: (fileName: string) => void };
    };
    const fontsSource = pdfFonts as { pdfMake?: { vfs?: Record<string, string> }; vfs?: Record<string, string> };

    printer.vfs = fontsSource.pdfMake?.vfs ?? fontsSource.vfs ?? printer.vfs;
    printer.createPdf(this.buildPdfDefinition()).download(`${this.cvDocument.fileStem}.pdf`);
  }

  private buildPdfDefinition(): object {
    const doc = this.cvDocument;
    const sectionTitle = (text: string) => ({
      text,
      margin: [0, 18, 0, 10],
      bold: true,
      fontSize: 12,
      color: '#334155',
      characterSpacing: 1
    });

    return {
      pageSize: 'A4',
      pageMargins: [36, 36, 36, 36],
      defaultStyle: {
        fontSize: 10,
        lineHeight: 1.35,
        color: '#1f2937'
      },
      content: [
        { text: doc.name, fontSize: 22, bold: true, margin: [0, 0, 0, 4] },
        { text: doc.headline, fontSize: 12, color: '#334155', margin: [0, 0, 0, 2] },
        { text: doc.location, color: '#475569', margin: [0, 0, 0, 14] },
        sectionTitle(doc.labels.contact),
        {
          columns: [
            {
              width: '*',
              stack: doc.contactLinks.filter((_, index) => index % 2 === 0).map((item) => ({
                text: [{ text: `${item.label}: `, bold: true }, item.value],
                margin: [0, 0, 0, 6]
              }))
            },
            {
              width: '*',
              stack: doc.contactLinks.filter((_, index) => index % 2 === 1).map((item) => ({
                text: [{ text: `${item.label}: `, bold: true }, item.value],
                margin: [0, 0, 0, 6]
              }))
            }
          ],
          columnGap: 18
        },
        sectionTitle(doc.labels.profile),
        ...doc.profile.map((paragraph) => ({ text: paragraph, margin: [0, 0, 0, 8] })),
        sectionTitle(doc.labels.technicalSkills),
        {
          columns: [
            {
              width: '*',
              stack: doc.skillCategories.filter((_, index) => index % 2 === 0).map((category) => ({
                stack: [
                  { text: category.title, bold: true, margin: [0, 0, 0, 4] },
                  { ul: category.items, margin: [0, 0, 0, 8] }
                ]
              }))
            },
            {
              width: '*',
              stack: doc.skillCategories.filter((_, index) => index % 2 === 1).map((category) => ({
                stack: [
                  { text: category.title, bold: true, margin: [0, 0, 0, 4] },
                  { ul: category.items, margin: [0, 0, 0, 8] }
                ]
              }))
            }
          ],
          columnGap: 18
        },
        sectionTitle(doc.labels.experience),
        ...doc.experience.flatMap((item) => [
          {
            columns: [
              {
                width: '*',
                stack: [
                  { text: item.role, bold: true, fontSize: 11 },
                  { text: item.company, color: '#475569' }
                ]
              },
              {
                width: 'auto',
                stack: [
                  { text: item.period, alignment: 'right', color: '#475569' },
                  { text: item.location, alignment: 'right', color: '#475569' }
                ]
              }
            ],
            margin: [0, 0, 0, 6]
          },
          { text: item.summary, margin: [0, 0, 0, 6] },
          { text: `${doc.labels.achievements}:`, bold: true, margin: [0, 0, 0, 4] },
          { ul: item.achievements, margin: [0, 0, 0, 6] },
          { text: [{ text: `${doc.labels.technologies}: `, bold: true }, item.technologies.join(', ')], margin: [0, 0, 0, 12] }
        ]),
        sectionTitle(doc.labels.education),
        ...doc.education.map((item) => ({
          text: [
            { text: `${item.degree}\n`, bold: true },
            `${item.institution} | ${item.period}`
          ],
          margin: [0, 0, 0, 10]
        })),
        sectionTitle(doc.labels.certifications),
        ...doc.certifications.map((item) => ({
          text: `${item.title} | ${item.issuer}${item.credentialUrl ? ` | ${item.credentialUrl}` : ''}`,
          margin: [0, 0, 0, 6]
        })),
        sectionTitle(doc.labels.projects),
        ...doc.projects.map((item) => ({
          stack: [
            { text: item.title, bold: true, margin: [0, 0, 0, 4] },
            { text: item.summary, margin: [0, 0, 0, 4] },
            { text: [{ text: `${doc.labels.technologies}: `, bold: true }, item.technologies.join(', ')], margin: [0, 0, 0, 2] },
            {
              text: [item.repositoryUrl, item.liveUrl].filter(Boolean).join(' | '),
              color: '#0f766e',
              margin: [0, 0, 0, 10]
            }
          ]
        })),
        {
          columns: [
            {
              width: '*',
              stack: [
                sectionTitle(doc.labels.languages),
                ...doc.languages.map((item) => ({ text: `${item.name}: ${item.level}`, margin: [0, 0, 0, 6] }))
              ]
            },
            {
              width: '*',
              stack: [
                sectionTitle(doc.labels.references),
                ...doc.references.map((item) => ({
                  text: `${item.name} | ${item.role} | ${item.company}${item.contact ? ` | ${item.contact}` : ''}`,
                  margin: [0, 0, 0, 6]
                }))
              ]
            }
          ],
          columnGap: 18
        }
      ]
    };
  }
}
