import './ToolboxAlignment.scss';
import {useContext} from "react";
import {VideoContext} from "../../context/Video/VideoContext";

const alignments = [
  {
    id : 'left',
    label : 'Left'
  },
  {
    id : 'center',
    label : 'Center'
  },
  {
    id : 'right',
    label : 'Right'
  }

]

export const ToolboxAlignment = () => {
  const videoContext = useContext(VideoContext);
  const onClick = (e, align) => {
    videoContext.setAlignment(align);
  }

  return (
    <section class="toolbox__alignment">
      {alignments.map(align => {
        const active = (videoContext.alignment.id === align.id)
        return (
          <button
            className={`button button--alignment${active ? ' active' : ''}`}
            onClick={(e) => onClick(e, align)}>
            {align.label}
          </button>
        )
      })}
    </section>
  )
}