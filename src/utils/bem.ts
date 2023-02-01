import { withNaming } from '@bem-react/classname';

const cn = withNaming({ n: 'bazaar-', e: '__', m: '--', v: '-' });

// const b = cn('icon', 'Element')
//
// console.log(b()) // shareic-icon__Element
// console.log(b('Element')) // shareic-icon__Element
// console.log(b({ Modifier: 'value' })) // shareic-icon__Element shareic-icon__Element--Modifier-value
// console.log(b({ disable: true })) // shareic-icon__Element shareic-icon__Element--disable
// console.log(b({ disable: false })) // shareic-icon__Element
//
// console.log(b('Element', ['mixin'])) // shareic-icon__Element mixin
// console.log(b({ disable: false }, ['mixin'])) // shareic-icon__Element mixin
// console.log(b({ disable: true }, ['mixin'])) // shareic-icon__Element shareic-icon__Element--disable mixin

export default cn;
