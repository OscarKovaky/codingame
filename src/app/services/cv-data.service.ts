import { Injectable } from '@angular/core';

export type CvLanguage = 'es' | 'en';

export interface CvLink {
  label: string;
  value: string;
  href?: string;
}

export interface CvSkillCategory {
  title: string;
  items: string[];
}

export interface CvExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface CvEducation {
  institution: string;
  degree: string;
  period: string;
  details?: string[];
}

export interface CvCertification {
  title: string;
  issuer: string;
  credentialUrl?: string;
}

export interface CvProject {
  title: string;
  summary: string;
  repositoryUrl?: string;
  liveUrl?: string;
  technologies: string[];
}

export interface CvLanguageSkill {
  name: string;
  level: string;
}

export interface CvReference {
  name: string;
  role: string;
  company: string;
  contact?: string;
  focus?: string;
}

export interface CvSectionLabels {
  contact: string;
  profile: string;
  technicalSkills: string;
  experience: string;
  education: string;
  certifications: string;
  projects: string;
  languages: string;
  references: string;
  technologies: string;
  achievements: string;
}

export interface CvUiCopy {
  languageSwitcherLabel: string;
  languageOptions: Record<CvLanguage, string>;
  downloadOriginalPdf: string;
  exportPdf: string;
  downloadWord: string;
  referencesSummary: string;
  atsNote: string;
  exportHint: string;
}

export interface CvDocument {
  language: CvLanguage;
  fileStem: string;
  name: string;
  headline: string;
  location: string;
  profile: string[];
  contactLinks: CvLink[];
  skillCategories: CvSkillCategory[];
  experience: CvExperience[];
  education: CvEducation[];
  certifications: CvCertification[];
  projects: CvProject[];
  languages: CvLanguageSkill[];
  references: CvReference[];
  strengths: string[];
  labels: CvSectionLabels;
  ui: CvUiCopy;
}

const CV_DOCUMENTS: Record<CvLanguage, CvDocument> = {
  es: {
    language: 'es',
    fileStem: 'Oscar-Ramirez-Aguilar-CV-ES',
    name: 'Oscar Ramirez Aguilar',
    headline: 'Desarrollador Full Stack .NET y Angular',
    location: 'Chilpancingo, Guerrero, Mexico',
    profile: [
      'Desarrollador Full Stack con mas de 5 anos de experiencia en desarrollo de software, especializado en C#, .NET, ASP.NET Core, Angular, SQL Server y Azure.',
      'Experiencia en construccion de APIs REST, microservicios, integracion de bases de datos, CI/CD, Docker y modernizacion de sistemas legacy.',
      'He participado en proyectos empresariales para sectores financiero, retail y tecnologia, contribuyendo en la mejora de rendimiento, mantenibilidad y calidad del codigo. Tambien cuento con experiencia en Java, Spring Boot y Quarkus para soluciones backend escalables.'
    ],
    contactLinks: [
      { label: 'Email', value: 'infertheno@hotmail.com', href: 'mailto:infertheno@hotmail.com' },
      { label: 'Telefono', value: '+52 747 186 9493', href: 'tel:+527471869493' },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/oscar-ramirez-aguilar-369762133',
        href: 'https://www.linkedin.com/in/oscar-ramirez-aguilar-369762133/'
      },
      { label: 'GitHub', value: 'github.com/OscarKovaky', href: 'https://github.com/OscarKovaky' },
      { label: 'Portafolio', value: 'oscarkovaky.github.io/codingame', href: 'https://oscarkovaky.github.io/codingame/' },
      { label: 'Ubicacion', value: 'Chilpancingo, Guerrero, Mexico' }
    ],
    skillCategories: [
      { title: 'Lenguajes', items: ['C#', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'Python', 'COBOL'] },
      {
        title: 'Frontend',
        items: ['Angular', 'Vue.js', 'React', 'HTML5', 'CSS3', 'SCSS', 'Bootstrap', 'Tailwind CSS', 'Angular Material', 'RxJS']
      },
      {
        title: 'Backend',
        items: ['.NET Framework', '.NET Core', '.NET 5/6/8', 'ASP.NET Core Web API', 'Entity Framework Core', 'Dapper', 'Spring Boot', 'Quarkus']
      },
      { title: 'Bases de datos', items: ['SQL Server', 'MySQL', 'PostgreSQL', 'SQLite', 'Azure SQL Database', 'Azure Cosmos DB'] },
      {
        title: 'Cloud y DevOps',
        items: ['Microsoft Azure', 'Azure App Service', 'Azure Functions', 'Azure Blob Storage', 'Azure Key Vault', 'Docker', 'Docker Compose', 'Kubernetes basico', 'Azure DevOps', 'GitHub Actions']
      },
      {
        title: 'Testing y calidad',
        items: ['xUnit', 'NUnit', 'JUnit', 'Moq', 'Postman', 'SoapUI', 'SonarQube', 'Checkmarx', 'Snyk', 'OWASP ZAP']
      },
      {
        title: 'Herramientas y metodologias',
        items: ['Git', 'GitFlow', 'Jira', 'Bitbucket', 'GitHub', 'Scrum', 'Clean Architecture', 'SOLID', 'MVC', 'CQRS', 'Microservicios']
      }
    ],
    experience: [
      {
        company: 'MLG / HSBC / Nestle',
        role: 'Full Stack Developer',
        period: 'Feb 2024 - Actualidad',
        location: 'Mexico · remoto / esquema hibrido',
        summary: 'Desarrollo Full Stack con Angular 18, Vue 2, C#, .NET 8 y SQL Server para iniciativas empresariales de alto impacto.',
        achievements: [
          'Construccion y mantenimiento de APIs REST y microservicios para soluciones empresariales.',
          'Lidere migraciones de modulos legacy Angular 8 y .NET MVC hacia Angular 18 y .NET 8, mejorando mantenibilidad y compatibilidad con procesos CI/CD.',
          'Implemente Hangfire, Docker y servicios en IIS para tareas programadas y despliegues controlados.',
          'Integre Kafka para mensajeria en tiempo real y SendGrid para notificaciones automatizadas.',
          'Logre una reduccion aproximada del 45 % en tiempos de carga del frontend mediante lazy loading, compresion de assets y caching.',
          'Contribui a una reduccion del 60 % de deuda tecnica con migraciones y modernizacion de modulos.'
        ],
        technologies: ['Angular 18', 'Vue 2', 'C#', '.NET 8', 'SQL Server', 'Entity Framework Core', 'Docker', 'Hangfire', 'Kafka', 'SendGrid', 'IIS', 'Git']
      },
      {
        company: 'GETechnologies',
        role: '.NET Developer',
        period: 'Ago 2023 - Ene 2024',
        location: 'Mexico',
        summary: 'Mantenimiento y evolucion de aplicaciones empresariales criticas en .NET Framework, ASP.NET MVC, Web API y SQL Server.',
        achievements: [
          'Implemente microservicios con Quarkus y Java, integrando REST, Hibernate Panache y Kafka.',
          'Construi servicios SOA con WCF y participe en mantenimiento de aplicaciones WPF bajo MVVM.',
          'Realice integraciones externas mediante HttpClient, Refit y RabbitMQ/Kafka.',
          'Participe en despliegues seguros en IIS y automatizacion con Azure DevOps y GitHub Actions.'
        ],
        technologies: ['C#', 'Java', 'Quarkus', 'ASP.NET MVC', 'Web API', 'WCF', 'WPF', 'SQL Server', 'Docker', 'Kafka', 'RabbitMQ', 'IIS']
      },
      {
        company: 'NTT DATA Mexico / IDB / TELCEL',
        role: 'Software Developer',
        period: 'Nov 2021 - Jul 2023',
        location: 'Mexico',
        summary: 'Desarrollo de soluciones con Angular, .NET 5/6, Spring Boot y SQL Server para plataformas empresariales de gran escala.',
        achievements: [
          'Participe en mantenimiento y evolucion de sistemas backend y frontend.',
          'Refactorice modulos con RxJS y ChangeDetectionStrategy.OnPush, mejorando el rendimiento de renderizado en un 30 %.',
          'Implemente pruebas unitarias con xUnit, alcanzando mas del 80 % de cobertura en componentes criticos.',
          'Desarrolle procesos batch en Java / Quarkus para facturacion y conciliacion.',
          'Optimice scripts T-SQL e inserciones en SQL Server para mejorar desempeno operativo.'
        ],
        technologies: ['Angular', 'C#', '.NET 5/6', 'Spring Boot', 'Java', 'Quarkus', 'SQL Server', 'xUnit', 'SonarQube', 'Azure', 'AWS Lambda']
      },
      {
        company: 'GestorX / Be-IT Software',
        role: 'Desarrollador .NET Jr / Full Stack Jr',
        period: 'Ene 2018 - Nov 2021',
        location: 'Mexico',
        summary: 'Desarrollo de aplicaciones web con Angular, .NET Core, ASP.NET Core Web API y SQL Server.',
        achievements: [
          'Construi APIs REST con validacion, Swagger y buenas practicas de manejo de errores.',
          'Implemente autenticacion y autorizacion con JWT, roles, claims y policies.',
          'Refactorice componentes dinamicos, logrando una mejora del 40 % en tiempo de renderizado.',
          'Desarrolle pruebas unitarias con NUnit y Moq, logrando mas del 80 % de cobertura.',
          'Participe en Azure DevOps Pipelines, GitFlow y pull requests.',
          'Optimice aplicaciones moviles con React Native, reduciendo el tamano del paquete final en 25 %.'
        ],
        technologies: ['Angular', 'JavaScript', 'TypeScript', 'C#', '.NET Core', 'ASP.NET Core', 'Entity Framework Core', 'Dapper', 'SQL Server', 'Azure DevOps', 'React Native', 'NUnit', 'Moq']
      }
    ],
    education: [{ institution: 'Universidad USN', degree: 'Ingenieria en Sistemas', period: '2017 - 2023' }],
    certifications: [
      { title: 'Responsive Web Design', issuer: 'freeCodeCamp', credentialUrl: 'https://freecodecamp.org/certification/kovasky/responsive-web-design' },
      { title: 'SQL (Avanzado) Certificate', issuer: 'HackerRank', credentialUrl: 'https://www.hackerrank.com/certificates/48d970510096' },
      { title: 'Frontend Developer (React) Certificate', issuer: 'HackerRank', credentialUrl: 'https://www.hackerrank.com/certificates/2919df29a1fe' },
      { title: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', credentialUrl: 'https://www.freecodecamp.org/certification/kovasky/javascript-algorithms-and-data-structures' }
    ],
    projects: [
      {
        title: 'Portafolio personal con Angular standalone',
        summary: 'Portafolio con Angular standalone, Three.js en el hero y una base de chatbot pensada para funcionar en GitHub Pages sin exponer secretos en frontend.',
        repositoryUrl: 'https://github.com/OscarKovaky/codingame',
        liveUrl: 'https://oscarkovaky.github.io/codingame/',
        technologies: ['Angular standalone', 'TypeScript', 'Three.js', 'GitHub Pages']
      },
      {
        title: 'Microservicio reusable de pagos',
        summary: 'Servicio sobre .NET 10 (LTS) con integracion de Mercado Pago y Stripe Connect para escenarios de cobro reutilizables.',
        repositoryUrl: 'https://github.com/OscarKovaky/motor-pagos-mercadopago',
        technologies: ['.NET', 'Mercado Pago', 'Stripe Connect', 'APIs REST']
      },
      {
        title: 'Motor de reservas multi-tenant',
        summary: 'Backend base para motor de reservas multi-tenant construido con Quarkus y Java 21.',
        repositoryUrl: 'https://github.com/OscarKovaky/motor-agendacitas-generico',
        technologies: ['Java 21', 'Quarkus', 'Arquitectura multi-tenant', 'Backend']
      },
      {
        title: 'Agenda administrativa Android',
        summary: 'Aplicacion Android administrativa para operar agenda, disponibilidad y reservas del motor de reservas.',
        technologies: ['Android', 'Administracion operativa', 'Reservas']
      }
    ],
    languages: [{ name: 'Espanol', level: 'Nativo' }, { name: 'Ingles', level: 'Intermedio profesional' }],
    references: [
      { name: 'Luis Mario Diaz Arenas', role: 'Centers Senior Service Leader', company: 'General' },
      { name: 'Magdalena Machuca Aguirre', role: 'Centers Leader Developer', company: 'General' },
      { name: 'Rosendo Guzman Nogueda', role: 'Senior Software Development Specialist', company: 'Universidad Autonoma de Guerrero', focus: 'React.js, Node.js y Angular' },
      { name: 'Eder Morales Adame', role: 'Senior Software Development .NET Specialist', company: 'GestorX', contact: 'eder.morales@gestorx.com' }
    ],
    strengths: [
      'Migracion de sistemas legacy a Angular 18 y .NET 8',
      'Desarrollo de microservicios y APIs REST',
      'Integracion con Kafka, SendGrid y servicios cloud',
      'Experiencia con Azure App Service, Azure Functions y despliegues CI/CD',
      'Optimizacion de rendimiento frontend y backend',
      'Buenas practicas de arquitectura: SOLID, Clean Architecture, MVC y CQRS'
    ],
    labels: {
      contact: 'Contacto',
      profile: 'Perfil profesional',
      technicalSkills: 'Habilidades tecnicas',
      experience: 'Experiencia profesional',
      education: 'Educacion',
      certifications: 'Certificaciones',
      projects: 'Proyectos destacados',
      languages: 'Idiomas',
      references: 'Referencias',
      technologies: 'Tecnologias',
      achievements: 'Logros'
    },
    ui: {
      languageSwitcherLabel: 'Idioma del CV',
      languageOptions: { es: 'ES', en: 'EN' },
      downloadOriginalPdf: 'Descargar PDF original',
      exportPdf: 'Exportar PDF del idioma activo',
      downloadWord: 'Descargar Word del idioma activo',
      referencesSummary: 'Mostrar referencias',
      atsNote: 'CV estructurado en HTML semantico para lectura humana, exportacion y procesos ATS.',
      exportHint: 'El PDF original en espanol se descarga como asset. La version activa se exporta desde HTML para mantener consistencia ATS.'
    }
  },
  en: {
    language: 'en',
    fileStem: 'Oscar-Ramirez-Aguilar-CV-EN',
    name: 'Oscar Ramirez Aguilar',
    headline: 'Full Stack Developer | .NET and Angular',
    location: 'Chilpancingo, Guerrero, Mexico',
    profile: [
      'Full Stack Developer with 5+ years of experience building business software, specializing in C#, .NET, ASP.NET Core, Angular, SQL Server, and Azure.',
      'Hands-on experience delivering REST APIs, microservices, database integrations, CI/CD pipelines, Docker-based workflows, and modernization initiatives for legacy systems.',
      'I have contributed to financial, retail, and technology projects, improving performance, maintainability, and code quality. I also bring backend experience with Java, Spring Boot, and Quarkus for scalable services.'
    ],
    contactLinks: [
      { label: 'Email', value: 'infertheno@hotmail.com', href: 'mailto:infertheno@hotmail.com' },
      { label: 'Phone', value: '+52 747 186 9493', href: 'tel:+527471869493' },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/oscar-ramirez-aguilar-369762133',
        href: 'https://www.linkedin.com/in/oscar-ramirez-aguilar-369762133/'
      },
      { label: 'GitHub', value: 'github.com/OscarKovaky', href: 'https://github.com/OscarKovaky' },
      { label: 'Portfolio', value: 'oscarkovaky.github.io/codingame', href: 'https://oscarkovaky.github.io/codingame/' },
      { label: 'Location', value: 'Chilpancingo, Guerrero, Mexico' }
    ],
    skillCategories: [
      { title: 'Languages', items: ['C#', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'Python', 'COBOL'] },
      {
        title: 'Frontend',
        items: ['Angular', 'Vue.js', 'React', 'HTML5', 'CSS3', 'SCSS', 'Bootstrap', 'Tailwind CSS', 'Angular Material', 'RxJS']
      },
      {
        title: 'Backend',
        items: ['.NET Framework', '.NET Core', '.NET 5/6/8', 'ASP.NET Core Web API', 'Entity Framework Core', 'Dapper', 'Spring Boot', 'Quarkus']
      },
      { title: 'Databases', items: ['SQL Server', 'MySQL', 'PostgreSQL', 'SQLite', 'Azure SQL Database', 'Azure Cosmos DB'] },
      {
        title: 'Cloud and DevOps',
        items: ['Microsoft Azure', 'Azure App Service', 'Azure Functions', 'Azure Blob Storage', 'Azure Key Vault', 'Docker', 'Docker Compose', 'Basic Kubernetes', 'Azure DevOps', 'GitHub Actions']
      },
      {
        title: 'Testing and Quality',
        items: ['xUnit', 'NUnit', 'JUnit', 'Moq', 'Postman', 'SoapUI', 'SonarQube', 'Checkmarx', 'Snyk', 'OWASP ZAP']
      },
      {
        title: 'Tools and Methodologies',
        items: ['Git', 'GitFlow', 'Jira', 'Bitbucket', 'GitHub', 'Scrum', 'Clean Architecture', 'SOLID', 'MVC', 'CQRS', 'Microservices']
      }
    ],
    experience: [
      {
        company: 'MLG / HSBC / Nestle',
        role: 'Full Stack Developer',
        period: 'Feb 2024 - Present',
        location: 'Mexico · remote / hybrid',
        summary: 'Delivered Full Stack solutions with Angular 18, Vue 2, C#, .NET 8, and SQL Server for enterprise-grade initiatives.',
        achievements: [
          'Built and maintained REST APIs and microservices for business-critical solutions.',
          'Led migrations from Angular 8 and .NET MVC legacy modules to Angular 18 and .NET 8, improving maintainability and CI/CD compatibility.',
          'Implemented Hangfire, Docker, and IIS-hosted services for scheduled jobs and controlled deployments.',
          'Integrated Kafka for real-time messaging and SendGrid for automated notifications.',
          'Reduced frontend loading times by approximately 45% through lazy loading, asset compression, and caching strategies.',
          'Helped reduce technical debt by 60% through modernization and migration work.'
        ],
        technologies: ['Angular 18', 'Vue 2', 'C#', '.NET 8', 'SQL Server', 'Entity Framework Core', 'Docker', 'Hangfire', 'Kafka', 'SendGrid', 'IIS', 'Git']
      },
      {
        company: 'GETechnologies',
        role: '.NET Developer',
        period: 'Aug 2023 - Jan 2024',
        location: 'Mexico',
        summary: 'Maintained and evolved critical enterprise applications built on .NET Framework, ASP.NET MVC, Web API, and SQL Server.',
        achievements: [
          'Implemented microservices with Quarkus and Java, integrating REST, Hibernate Panache, and Kafka.',
          'Built SOA services with WCF and contributed to WPF maintenance under the MVVM pattern.',
          'Delivered third-party integrations using HttpClient, Refit, and RabbitMQ/Kafka.',
          'Supported secure IIS deployments and automation through Azure DevOps and GitHub Actions.'
        ],
        technologies: ['C#', 'Java', 'Quarkus', 'ASP.NET MVC', 'Web API', 'WCF', 'WPF', 'SQL Server', 'Docker', 'Kafka', 'RabbitMQ', 'IIS']
      },
      {
        company: 'NTT DATA Mexico / IDB / TELCEL',
        role: 'Software Developer',
        period: 'Nov 2021 - Jul 2023',
        location: 'Mexico',
        summary: 'Built and supported enterprise solutions with Angular, .NET 5/6, Spring Boot, and SQL Server.',
        achievements: [
          'Contributed to the maintenance and evolution of frontend and backend systems.',
          'Refactored modules with RxJS and ChangeDetectionStrategy.OnPush, improving rendering performance by 30%.',
          'Implemented unit tests with xUnit and achieved more than 80% coverage in critical components.',
          'Developed Java / Quarkus batch processes for billing and reconciliation.',
          'Optimized T-SQL scripts and SQL Server insert operations to improve operational performance.'
        ],
        technologies: ['Angular', 'C#', '.NET 5/6', 'Spring Boot', 'Java', 'Quarkus', 'SQL Server', 'xUnit', 'SonarQube', 'Azure', 'AWS Lambda']
      },
      {
        company: 'GestorX / Be-IT Software',
        role: '.NET Jr Developer / Full Stack Jr',
        period: 'Jan 2018 - Nov 2021',
        location: 'Mexico',
        summary: 'Developed web applications with Angular, .NET Core, ASP.NET Core Web API, and SQL Server.',
        achievements: [
          'Built REST APIs with validation, Swagger, and solid error-handling practices.',
          'Implemented authentication and authorization using JWT, roles, claims, and policies.',
          'Refactored dynamic components, achieving a 40% improvement in rendering time.',
          'Developed unit tests with NUnit and Moq, reaching more than 80% coverage.',
          'Contributed to Azure DevOps Pipelines, GitFlow, and pull request workflows.',
          'Optimized React Native mobile applications, reducing final package size by 25%.'
        ],
        technologies: ['Angular', 'JavaScript', 'TypeScript', 'C#', '.NET Core', 'ASP.NET Core', 'Entity Framework Core', 'Dapper', 'SQL Server', 'Azure DevOps', 'React Native', 'NUnit', 'Moq']
      }
    ],
    education: [{ institution: 'USN University', degree: 'Systems Engineering', period: '2017 - 2023' }],
    certifications: [
      { title: 'Responsive Web Design', issuer: 'freeCodeCamp', credentialUrl: 'https://freecodecamp.org/certification/kovasky/responsive-web-design' },
      { title: 'SQL (Advanced) Certificate', issuer: 'HackerRank', credentialUrl: 'https://www.hackerrank.com/certificates/48d970510096' },
      { title: 'Frontend Developer (React) Certificate', issuer: 'HackerRank', credentialUrl: 'https://www.hackerrank.com/certificates/2919df29a1fe' },
      { title: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', credentialUrl: 'https://www.freecodecamp.org/certification/kovasky/javascript-algorithms-and-data-structures' }
    ],
    projects: [
      {
        title: 'Standalone Angular portfolio',
        summary: 'Personal portfolio built with standalone Angular, a Three.js hero, and a chatbot foundation designed to run on GitHub Pages without exposing secrets in the frontend.',
        repositoryUrl: 'https://github.com/OscarKovaky/codingame',
        liveUrl: 'https://oscarkovaky.github.io/codingame/',
        technologies: ['Angular standalone', 'TypeScript', 'Three.js', 'GitHub Pages']
      },
      {
        title: 'Reusable payments microservice',
        summary: 'Reusable .NET 10 (LTS) service integrating Mercado Pago and Stripe Connect for payment workflows.',
        repositoryUrl: 'https://github.com/OscarKovaky/motor-pagos-mercadopago',
        technologies: ['.NET', 'Mercado Pago', 'Stripe Connect', 'REST APIs']
      },
      {
        title: 'Multi-tenant booking engine',
        summary: 'Foundational backend for a multi-tenant booking engine built with Quarkus and Java 21.',
        repositoryUrl: 'https://github.com/OscarKovaky/motor-agendacitas-generico',
        technologies: ['Java 21', 'Quarkus', 'Multi-tenant architecture', 'Backend']
      },
      {
        title: 'Android admin scheduler',
        summary: 'Administrative Android application to operate scheduling, availability, and reservations for the booking engine.',
        technologies: ['Android', 'Operational administration', 'Reservations']
      }
    ],
    languages: [{ name: 'Spanish', level: 'Native' }, { name: 'English', level: 'Professional working proficiency' }],
    references: [
      { name: 'Luis Mario Diaz Arenas', role: 'Centers Senior Service Leader', company: 'General' },
      { name: 'Magdalena Machuca Aguirre', role: 'Centers Leader Developer', company: 'General' },
      { name: 'Rosendo Guzman Nogueda', role: 'Senior Software Development Specialist', company: 'Autonomous University of Guerrero', focus: 'React.js, Node.js, and Angular' },
      { name: 'Eder Morales Adame', role: 'Senior Software Development .NET Specialist', company: 'GestorX', contact: 'eder.morales@gestorx.com' }
    ],
    strengths: [
      'Legacy migration from Angular 8 / .NET MVC to Angular 18 and .NET 8',
      'REST API and microservices delivery',
      'Kafka, SendGrid, and cloud-service integrations',
      'Hands-on experience with Azure App Service, Azure Functions, and CI/CD deployments',
      'Frontend and backend performance optimization',
      'Architecture practices including SOLID, Clean Architecture, MVC, and CQRS'
    ],
    labels: {
      contact: 'Contact',
      profile: 'Professional Profile',
      technicalSkills: 'Technical Skills',
      experience: 'Professional Experience',
      education: 'Education',
      certifications: 'Certifications',
      projects: 'Highlighted Projects',
      languages: 'Languages',
      references: 'References',
      technologies: 'Technologies',
      achievements: 'Key Contributions'
    },
    ui: {
      languageSwitcherLabel: 'CV language',
      languageOptions: { es: 'ES', en: 'EN' },
      downloadOriginalPdf: 'Download original PDF',
      exportPdf: 'Export active language as PDF',
      downloadWord: 'Download active language as Word',
      referencesSummary: 'Show references',
      atsNote: 'Resume structured in semantic HTML for recruiter readability, export workflows, and ATS parsing.',
      exportHint: 'The original Spanish PDF is downloaded as a static asset. The active language version is exported from HTML to keep the ATS-friendly structure aligned.'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class CvDataService {
  getDocument(language: CvLanguage): CvDocument {
    return CV_DOCUMENTS[language];
  }
}
