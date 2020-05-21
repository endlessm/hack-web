import MetropolisRegularWoff2 from './Metropolis-Regular.woff2';
import MetropolisSemiBoldWoff2 from './Metropolis-SemiBold.woff2';
import MetropolisBoldWoff2 from './Metropolis-Bold.woff2';

const metropolis = {
  fontFamily: 'Metropolis',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('Metropolis'),
    local('Metropolis-Regular'),
    url(${MetropolisRegularWoff2}) format('woff2')
  `,
};

const metropolisSemiBold = {
  fontFamily: 'Metropolis-SemiBold',
  fontStyle: 'normal',
  fontWeight: 600,
  src: `
    local('Metropolis-SemiBold'),
    local('Metropolis-SemiBold'),
    url(${MetropolisSemiBoldWoff2}) format('woff2')
  `,
};

const metropolisBold = {
  fontFamily: 'Metropolis-Bold',
  fontStyle: 'normal',
  fontWeight: 700,
  src: `
    local('Metropolis-Bold'),
    local('Metropolis-Bold'),
    url(${MetropolisBoldWoff2}) format('woff2')
  `,
};

export { metropolis, metropolisSemiBold, metropolisBold };
