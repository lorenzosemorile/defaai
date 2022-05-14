import {Preview} from "../Preview/Preview";
import {Toolbox} from '../Toolbox/Toolbox'

export const Main = () => {
  return (
    <main className="flex gap-x-8">
      <Preview />
      <Toolbox />
    </main>
  )
}