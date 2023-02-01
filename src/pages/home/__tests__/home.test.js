import { cleanup, fireEvent, render } from '@testing-library/react';
import CheckboxWithLabel from '../index';

afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
	const { asFragment, queryByLabelText, getByLabelText } = render(
		<CheckboxWithLabel labelOn="On" labelOff="Off" />
	);

	expect(asFragment()).toMatchSnapshot();

	expect(queryByLabelText(/off/i)).toBeTruthy();

	fireEvent.click(getByLabelText(/off/i));

	expect(queryByLabelText(/on/i)).toBeTruthy();
});
