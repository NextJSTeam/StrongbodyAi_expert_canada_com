export interface LanguageOption {
  code: string;
  name: string;
  englishName: string;
  countryCode: string;
}

export function getEmojiFlag(countryCode: string): string {
  if (!countryCode || !/^[A-Za-z]{2}$/.test(countryCode)) {
    return '🌐';
  }
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export const GOOGLE_TRANSLATE_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', englishName: 'English', countryCode: 'US' },
  { code: 'af', name: 'Afrikaans', englishName: 'Afrikaans', countryCode: 'ZA' },
  { code: 'sq', name: 'Shqip', englishName: 'Albanian', countryCode: 'AL' },
  { code: 'am', name: 'አማርኛ', englishName: 'Amharic', countryCode: 'ET' },
  { code: 'ar', name: 'العربية', englishName: 'Arabic', countryCode: 'SA' },
  { code: 'hy', name: 'Հայերեն', englishName: 'Armenian', countryCode: 'AM' },
  { code: 'as', name: 'অসমীয়া', englishName: 'Assamese', countryCode: 'IN' },
  { code: 'ay', name: 'Aymar aru', englishName: 'Aymara', countryCode: 'BO' },
  { code: 'az', name: 'Azərbaycan', englishName: 'Azerbaijani', countryCode: 'AZ' },
  { code: 'bm', name: 'Bamanankan', englishName: 'Bambara', countryCode: 'ML' },
  { code: 'eu', name: 'Euskara', englishName: 'Basque', countryCode: 'ES' },
  { code: 'be', name: 'Беларуская', englishName: 'Belarusian', countryCode: 'BY' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali', countryCode: 'BD' },
  { code: 'bho', name: 'भोजपुरी', englishName: 'Bhojpuri', countryCode: 'IN' },
  { code: 'bs', name: 'Bosanski', englishName: 'Bosnian', countryCode: 'BA' },
  { code: 'bg', name: 'Български', englishName: 'Bulgarian', countryCode: 'BG' },
  { code: 'ca', name: 'Català', englishName: 'Catalan', countryCode: 'ES' },
  { code: 'ceb', name: 'Cebuano', englishName: 'Cebuano', countryCode: 'PH' },
  { code: 'zh-CN', name: '简体中文', englishName: 'Chinese (Simplified)', countryCode: 'CN' },
  { code: 'zh-TW', name: '繁體中文', englishName: 'Chinese (Traditional)', countryCode: 'TW' },
  { code: 'co', name: 'Corsu', englishName: 'Corsican', countryCode: 'FR' },
  { code: 'hr', name: 'Hrvatski', englishName: 'Croatian', countryCode: 'HR' },
  { code: 'cs', name: 'Čeština', englishName: 'Czech', countryCode: 'CZ' },
  { code: 'da', name: 'Dansk', englishName: 'Danish', countryCode: 'DK' },
  { code: 'dv', name: 'ދިވެހި', englishName: 'Dhivehi', countryCode: 'MV' },
  { code: 'doi', name: 'डोगरी', englishName: 'Dogri', countryCode: 'IN' },
  { code: 'nl', name: 'Nederlands', englishName: 'Dutch', countryCode: 'NL' },
  { code: 'eo', name: 'Esperanto', englishName: 'Esperanto', countryCode: 'EU' },
  { code: 'et', name: 'Eesti', englishName: 'Estonian', countryCode: 'EE' },
  { code: 'ee', name: 'Eʋegbe', englishName: 'Ewe', countryCode: 'GH' },
  { code: 'fil', name: 'Filipino', englishName: 'Filipino', countryCode: 'PH' },
  { code: 'fi', name: 'Suomi', englishName: 'Finnish', countryCode: 'FI' },
  { code: 'fr', name: 'Français', englishName: 'French', countryCode: 'FR' },
  { code: 'fy', name: 'Frysk', englishName: 'Frisian', countryCode: 'NL' },
  { code: 'gl', name: 'Galego', englishName: 'Galician', countryCode: 'ES' },
  { code: 'ka', name: 'ქართული', englishName: 'Georgian', countryCode: 'GE' },
  { code: 'de', name: 'Deutsch', englishName: 'German', countryCode: 'DE' },
  { code: 'el', name: 'Ελληνικά', englishName: 'Greek', countryCode: 'GR' },
  { code: 'gn', name: 'Guarani', englishName: 'Guarani', countryCode: 'PY' },
  { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', countryCode: 'IN' },
  { code: 'ht', name: 'Kreyòl ayisyen', englishName: 'Haitian Creole', countryCode: 'HT' },
  { code: 'ha', name: 'Hausa', englishName: 'Hausa', countryCode: 'NG' },
  { code: 'haw', name: 'ʻŌlelo Hawaiʻi', englishName: 'Hawaiian', countryCode: 'US' },
  { code: 'he', name: 'עברית', englishName: 'Hebrew', countryCode: 'IL' },
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi', countryCode: 'IN' },
  { code: 'hmn', name: 'Hmoob', englishName: 'Hmong', countryCode: 'LA' },
  { code: 'hu', name: 'Magyar', englishName: 'Hungarian', countryCode: 'HU' },
  { code: 'is', name: 'Íslenska', englishName: 'Icelandic', countryCode: 'IS' },
  { code: 'ig', name: 'Igbo', englishName: 'Igbo', countryCode: 'NG' },
  { code: 'ilo', name: 'Ilokano', englishName: 'Ilocano', countryCode: 'PH' },
  { code: 'id', name: 'Bahasa Indonesia', englishName: 'Indonesian', countryCode: 'ID' },
  { code: 'ga', name: 'Gaeilge', englishName: 'Irish', countryCode: 'IE' },
  { code: 'it', name: 'Italiano', englishName: 'Italian', countryCode: 'IT' },
  { code: 'ja', name: '日本語', englishName: 'Japanese', countryCode: 'JP' },
  { code: 'jv', name: 'Basa Jawa', englishName: 'Javanese', countryCode: 'ID' },
  { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', countryCode: 'IN' },
  { code: 'kk', name: 'Қазақ', englishName: 'Kazakh', countryCode: 'KZ' },
  { code: 'km', name: 'ខ្មែរ', englishName: 'Khmer', countryCode: 'KH' },
  { code: 'rw', name: 'Kinyarwanda', englishName: 'Kinyarwanda', countryCode: 'RW' },
  { code: 'gom', name: 'कोंकणी', englishName: 'Konkani', countryCode: 'IN' },
  { code: 'ko', name: '한국어', englishName: 'Korean', countryCode: 'KR' },
  { code: 'kri', name: 'Krio', englishName: 'Krio', countryCode: 'SL' },
  { code: 'ku', name: 'Kurdî', englishName: 'Kurdish (Kurmanji)', countryCode: 'TR' },
  { code: 'ckb', name: 'کوردی', englishName: 'Kurdish (Sorani)', countryCode: 'IQ' },
  { code: 'ky', name: 'Кыргызча', englishName: 'Kyrgyz', countryCode: 'KG' },
  { code: 'lo', name: 'ລາວ', englishName: 'Lao', countryCode: 'LA' },
  { code: 'la', name: 'Latina', englishName: 'Latin', countryCode: 'VA' },
  { code: 'lv', name: 'Latviešu', englishName: 'Latvian', countryCode: 'LV' },
  { code: 'ln', name: 'Lingála', englishName: 'Lingala', countryCode: 'CD' },
  { code: 'lt', name: 'Lietuvių', englishName: 'Lithuanian', countryCode: 'LT' },
  { code: 'lg', name: 'Luganda', englishName: 'Luganda', countryCode: 'UG' },
  { code: 'lb', name: 'Lëtzebuergesch', englishName: 'Luxembourgish', countryCode: 'LU' },
  { code: 'mk', name: 'Македонски', englishName: 'Macedonian', countryCode: 'MK' },
  { code: 'mai', name: 'मैथिली', englishName: 'Maithili', countryCode: 'IN' },
  { code: 'mg', name: 'Malagasy', englishName: 'Malagasy', countryCode: 'MG' },
  { code: 'ms', name: 'Bahasa Melayu', englishName: 'Malay', countryCode: 'MY' },
  { code: 'ml', name: 'മലയാളം', englishName: 'Malayalam', countryCode: 'IN' },
  { code: 'mt', name: 'Malti', englishName: 'Maltese', countryCode: 'MT' },
  { code: 'mi', name: 'Te Reo Māori', englishName: 'Maori', countryCode: 'NZ' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi', countryCode: 'IN' },
  { code: 'mni-Mtei', name: 'ꯃꯤꯇꯩꯂꯣꯟ', englishName: 'Meiteilon (Manipuri)', countryCode: 'IN' },
  { code: 'lus', name: 'Mizo ṭawng', englishName: 'Mizo', countryCode: 'IN' },
  { code: 'mn', name: 'Монгол', englishName: 'Mongolian', countryCode: 'MN' },
  { code: 'ne', name: 'नेपाली', englishName: 'Nepali', countryCode: 'NP' },
  { code: 'no', name: 'Norsk', englishName: 'Norwegian', countryCode: 'NO' },
  { code: 'ny', name: 'Chichewa', englishName: 'Nyanja (Chichewa)', countryCode: 'MW' },
  { code: 'or', name: 'ଓଡ଼ିଆ', englishName: 'Odia (Oriya)', countryCode: 'IN' },
  { code: 'om', name: 'Oromoo', englishName: 'Oromo', countryCode: 'ET' },
  { code: 'pl', name: 'Polski', englishName: 'Polish', countryCode: 'PL' },
  { code: 'pt', name: 'Português', englishName: 'Portuguese', countryCode: 'BR' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', countryCode: 'IN' },
  { code: 'qu', name: 'Runasimi', englishName: 'Quechua', countryCode: 'PE' },
  { code: 'ro', name: 'Română', englishName: 'Romanian', countryCode: 'RO' },
  { code: 'ru', name: 'Русский', englishName: 'Russian', countryCode: 'RU' },
  { code: 'sm', name: 'Gagana Samoa', englishName: 'Samoan', countryCode: 'WS' },
  { code: 'sa', name: 'संस्कृत', englishName: 'Sanskrit', countryCode: 'IN' },
  { code: 'gd', name: 'Gàidhlig', englishName: 'Scots Gaelic', countryCode: 'GB' },
  { code: 'nso', name: 'Sepedi', englishName: 'Sepedi', countryCode: 'ZA' },
  { code: 'sr', name: 'Српски', englishName: 'Serbian', countryCode: 'RS' },
  { code: 'st', name: 'Sesotho', englishName: 'Sesotho', countryCode: 'LS' },
  { code: 'sn', name: 'ChiShona', englishName: 'Shona', countryCode: 'ZW' },
  { code: 'sd', name: 'سنڌي', englishName: 'Sindhi', countryCode: 'PK' },
  { code: 'si', name: 'සිංහල', englishName: 'Sinhala', countryCode: 'LK' },
  { code: 'sk', name: 'Slovenčina', englishName: 'Slovak', countryCode: 'SK' },
  { code: 'sl', name: 'Slovenščina', englishName: 'Slovenian', countryCode: 'SI' },
  { code: 'so', name: 'Soomaali', englishName: 'Somali', countryCode: 'SO' },
  { code: 'es', name: 'Español', englishName: 'Spanish', countryCode: 'ES' },
  { code: 'su', name: 'Basa Sunda', englishName: 'Sundanese', countryCode: 'ID' },
  { code: 'sw', name: 'Kiswahili', englishName: 'Swahili', countryCode: 'TZ' },
  { code: 'sv', name: 'Svenska', englishName: 'Swedish', countryCode: 'SE' },
  { code: 'tg', name: 'Тоҷикӣ', englishName: 'Tajik', countryCode: 'TJ' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', countryCode: 'IN' },
  { code: 'tt', name: 'Татар', englishName: 'Tatar', countryCode: 'RU' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu', countryCode: 'IN' },
  { code: 'th', name: 'ไทย', englishName: 'Thai', countryCode: 'TH' },
  { code: 'ti', name: 'ትግርኛ', englishName: 'Tigrinya', countryCode: 'ER' },
  { code: 'ts', name: 'Xitsonga', englishName: 'Tsonga', countryCode: 'ZA' },
  { code: 'tr', name: 'Türkçe', englishName: 'Turkish', countryCode: 'TR' },
  { code: 'tk', name: 'Türkmen', englishName: 'Turkmen', countryCode: 'TM' },
  { code: 'ak', name: 'Twi', englishName: 'Twi', countryCode: 'GH' },
  { code: 'uk', name: 'Українська', englishName: 'Ukrainian', countryCode: 'UA' },
  { code: 'ur', name: 'اردو', englishName: 'Urdu', countryCode: 'PK' },
  { code: 'ug', name: 'ئۇيغۇرچە', englishName: 'Uyghur', countryCode: 'CN' },
  { code: 'uz', name: 'Oʻzbek', englishName: 'Uzbek', countryCode: 'UZ' },
  { code: 'vi', name: 'Tiếng Việt', englishName: 'Vietnamese', countryCode: 'VN' },
  { code: 'cy', name: 'Cymraeg', englishName: 'Welsh', countryCode: 'GB' },
  { code: 'xh', name: 'isiXhosa', englishName: 'Xhosa', countryCode: 'ZA' },
  { code: 'yi', name: 'ייִדיש', englishName: 'Yiddish', countryCode: 'IL' },
  { code: 'yo', name: 'Yorùbá', englishName: 'Yoruba', countryCode: 'NG' },
  { code: 'zu', name: 'isiZulu', englishName: 'Zulu', countryCode: 'ZA' },
];

export function languageToSlug(language: LanguageOption): string {
  return language.englishName
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildLanguagePairSlug(from: LanguageOption, to: LanguageOption): string {
  return `${languageToSlug(from)}-to-${languageToSlug(to)}`;
}

const languagesBySlug = new Map(GOOGLE_TRANSLATE_LANGUAGES.map(lang => [languageToSlug(lang), lang]));

export function parseLanguagePairSlug(slug: string):
  | {
      from: LanguageOption;
      to: LanguageOption;
    }
  | null {
  const separator = '-to-';
  const separatorIndex = slug.indexOf(separator);

  if (separatorIndex < 1) return null;

  const fromSlug = slug.slice(0, separatorIndex);
  const toSlug = slug.slice(separatorIndex + separator.length);
  const from = languagesBySlug.get(fromSlug);
  const to = languagesBySlug.get(toSlug);

  if (!from || !to || from.code === to.code) return null;

  return { from, to };
}

export function getLanguageDisplayName(language: LanguageOption): string {
  if (language.name === language.englishName) return language.englishName;
  return `${language.englishName} (${language.name})`;
}

export function getAllLanguagePairSlugs(): string[] {
  const slugs: string[] = [];

  for (const from of GOOGLE_TRANSLATE_LANGUAGES) {
    for (const to of GOOGLE_TRANSLATE_LANGUAGES) {
      if (from.code !== to.code) {
        slugs.push(buildLanguagePairSlug(from, to));
      }
    }
  }

  return slugs;
}

export const FIXED_SOURCE_LANGUAGE: LanguageOption = {
  code: 'en',
  name: 'English',
  englishName: 'English',
  countryCode: 'CA',
};

export function parseFixedSourceLanguagePairSlug(slug: string):
  | {
      from: LanguageOption;
      to: LanguageOption;
    }
  | null {
  const pair = parseLanguagePairSlug(slug);
  if (!pair) return null;
  if (languageToSlug(pair.from) !== languageToSlug(FIXED_SOURCE_LANGUAGE)) return null;
  if (pair.to.code === FIXED_SOURCE_LANGUAGE.code) return null;
  return { from: FIXED_SOURCE_LANGUAGE, to: pair.to };
}

export function getFixedSourceLanguagePairSlugs(): string[] {
  return GOOGLE_TRANSLATE_LANGUAGES.filter(lang => lang.code !== FIXED_SOURCE_LANGUAGE.code).map(
    lang => buildLanguagePairSlug(FIXED_SOURCE_LANGUAGE, lang),
  );
}
