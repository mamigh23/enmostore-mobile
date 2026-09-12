import {translations} from '../src/core/localization/translations';
test('all supported locales expose the same keys',()=>{const keys=Object.keys(translations.en).sort();for(const locale of Object.values(translations)){expect(Object.keys(locale).sort()).toEqual(keys)}});
