import './ToolboxBackground.scss';
import {useState} from "react";
import {Accordion} from "../Accordion/Accordion";
const defaultBackgrounds = [
  {
    id : '1',
    label : 'Office',
    src : require('../../assets/img/backgrounds/1.jpg')
  },
  {
    id : '2',
    label : 'Office',
    src : require('../../assets/img/backgrounds/2.jpg')
  },
  {
    id : '3',
    label : 'Office',
    src : require('../../assets/img/backgrounds/3.jpg')
  },
  {
    id : '4',
    label : 'Office',
    src : require('../../assets/img/backgrounds/4.jpg')
  },
  {
    id : '5',
    label : 'Office',
    src : require('../../assets/img/backgrounds/5.jpg')
  },
  {
    id : '6',
    label : 'Office',
    src : require('../../assets/img/backgrounds/6.jpg')
  },
]
const accordions = [
  {
    id : 'images',
    title : 'Images',
    data : defaultBackgrounds
  },
  {
    id : 'solidcolours',
    title : 'Solid Colours'
  },
  {
    id : 'videos',
    title : 'Videos'
  }
]


export const ToolboxBackground = () => {

 const activeAccordion = accordions[0];
  return (
    <section className="toolbox__backgorund">
      {accordions.map(accordion => {
        const active = (accordion.id === activeAccordion.id);
        return (
          <Accordion
            key={accordion.id}
            title={accordion.title}
            active={active}>
            <div className={`toolbox__background__container toolbox--${accordion.id}`}>
              {accordion.data && accordion.data.map(img => {
                return (
                  <div key={img.id} className="toolbox__background__image">
                    <img src={img.src} alt={img.label}/>
                  </div>
                )
              })}
            </div>
          </Accordion>
        )
      })}
    </section>
  )
}