import { ArrowRight, Check, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clothingTemplates } from '../config/template.registry';

export default function TemplateSelectorPage() {
  return <main className="template-selector">
    <header className="selector-header">
      <div className="selector-brand">VÉRA <span>Catalogue Preview</span></div>
      <p>Clothing / Shoes / Accessories</p>
    </header>

    <section className="selector-content" aria-labelledby="selector-title">
      <div className="selector-intro">
        <span className="selector-kicker">Three directions · One catalogue engine</span>
        <h1 id="selector-title">Choose your catalogue style</h1>
        <p className="selector-lead">Compare each visual direction and open the demo that fits your store.</p>
      </div>

      <div className="template-cards">
        {clothingTemplates.map((template, index) => {
          const isAvailable = template.status === 'available';
          const preview = <>
            <div className="template-preview" aria-hidden="true">
              <span className="preview-number">0{index + 1}</span>
              <div className="preview-frame"><i/><i/><i/></div>
              <strong>{template.displayName}</strong>
            </div>

            <div className="template-card-body">
              <div className="template-meta">
                <span>Style 0{index + 1}</span>
                <span className={`template-status status-${template.status}`}>
                  {isAvailable ? <Check/> : <Clock3/>}
                  {isAvailable ? 'Available' : 'Coming Soon'}
                </span>
              </div>
              <h2 id={`template-title-${template.id}`}>{template.displayName}</h2>
              <p>{template.description}</p>
              <span className="template-action">
                {isAvailable ? 'View Demo' : 'Coming Soon'}
                {isAvailable && <ArrowRight aria-hidden="true"/>}
              </span>
            </div>
          </>;

          return isAvailable
            ? <Link
                className={`template-card preview-${template.id}`}
                key={template.id}
                to={template.route}
                aria-label={`View ${template.displayName} demo`}
              >
                {preview}
              </Link>
            : <article
                className={`template-card template-card-pending preview-${template.id}`}
                key={template.id}
                aria-labelledby={`template-title-${template.id}`}
              >
                {preview}
              </article>;
        })}
      </div>
    </section>
  </main>;
}
