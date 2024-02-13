import * as React from 'react'


type props = 
  & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'onChange'>
  & {
      options :{label :string, value :string}[],
      value :string[],
  }


export default function Checkbox(props :props) :JSX.Element
{
    const {
        options,
        value,
        ...inputAttr
    } = props

    const [g, s] = React.useState<props['value']>(value)
    
    const change :React.ChangeEventHandler<HTMLInputElement> = async (change) => {
        s((g) => {
            return (change.target.checked)
                ? Array.from(new Set<string>([...g, change.target.value]))
                : g.filter((v) => v != change.target.value)
        })
    }

    return (
        <ul className='checkbox'>
        {
            options.map((option, i) => {
                const k = `${inputAttr.name}-${option.value}-${i}`
                const checked = (inputAttr.onChange ? value : g).includes(option.value)

                return (
                    <li key={k}>
                        <input
                            type='checkbox'
                            id={k}
                            value={option.value}
                            onChange={change}
                            checked={checked}
                            aria-checked={checked}
                        />
                        <label htmlFor={k}>{option.label}</label>
                    </li>
                )
            })
        }
        </ul>
    )
}




