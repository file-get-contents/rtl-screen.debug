
import {render, screen, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'


describe('Checkbox component ut', () => {
    const baseProps = {
        disabled: true,
        label: 'label test',
        supplement: <p>supplemnt text.</p>,
        err: undefined,
        options: [
            {value: 'test-value-1', label: 'role-label-1'},
            {value: 'test-value-2', label: 'role-label-2'},
        ],
        value: ['test-value-1']
    }

    test('onChange "true" to "false" test. (contains screen.debug bug)', async () => {
        const user = userEvent.setup()

        render(
            <App {...{...baseProps, disabled: false,}}/>
        )

        const op = baseProps.options[0]


        const checked = screen.getByRole('checkbox', {
            name: op.label,
            checked: true,
        }) as HTMLInputElement

        // No.1
        console.log('chcked is:', checked.checked)
        screen.debug(checked)

        await user.click(checked)
        const unchecked = await screen.findByRole('checkbox', {
            name: op.label,
            checked: false,
        }) as HTMLInputElement

        expect(unchecked).toBeTruthy()

        // No.2
        console.log('chcked is:', unchecked.checked)
        screen.debug(unchecked)
    })

/*

// No.1
chcked is: true
<input
  aria-checked="true"
  checked=""
  id="undefined-test-value-1-0"
  tabindex="0"
  type="checkbox"
  value="test-value-1"
/>

// No.2
chcked is: false
<input
  aria-checked="false"  <= OK
  checked=""            <= NG
  id="undefined-test-value-1-0"
  tabindex="0"
  type="checkbox"
  value="test-value-1"
/>

*/
})



