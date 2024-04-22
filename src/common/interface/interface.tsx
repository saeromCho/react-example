import { CurrencyEnum, LocaleEnum } from '@lib/enum';

export interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number;
  market_cap_rank: number | null;
  fully_diluted_valuation?: number | null;
  total_volume: number;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: string | null;
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

export interface IToastProps {
  message: string;
}

export interface IGlobalContextType {
  bookmarks: ICoin[];
  addBookmark: (coin: ICoin) => void;
  removeBookmark: (id: string) => void;
  locale: LocaleEnum;
  changeLocale: (locale: LocaleEnum) => void;
  currency: CurrencyEnum;
  changeCurrency: (currency: CurrencyEnum) => void;
}

export interface IBookmarkIconProps {
  isBookmarked: boolean;
  coin: any;
}

export interface ICoinNameCellProps {
  coinId: string;
  children: React.ReactElement;
}

export interface ICoinInfoRowProps {
  label: string;
  value: string | number | undefined;
  isLink: boolean;
}

export interface IInfoTableProps {
  data: ICoinInfoRowProps[];
}

export interface ICurrencyProps {
  currency: string;
}

export interface ICoinInfoTableProps {
  marketCapRank: number;
  websiteUrl: string | undefined;
}

export interface ICoinPriceAndChangedRateProps {
  currency: CurrencyEnum;
  currentPrice: number | undefined;
  changedRate24HByCurrency: number | undefined;
  symbol: string;
  changedRate24H: number | null;
  marketCap: number | undefined;
  totalVolume24H: number | undefined;
}

export interface ISymbolInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface ICurrencyInputProps {
  currency: string;
  value: string;
  onChange: (value: string) => void;
}

export interface IPropsLoadingDotsProps {
  isFitted?: boolean;
}

export interface IDotProps {
  delay: string;
}

export interface IArrowIconSvgProps {
  isDescriptionShown: boolean;
}

export interface IBookmarkIconSvgProps {
  isBookmarked: boolean;
}

export interface ICoinDetail {
  id: ID;
  symbol: string;
  name: string;
  web_slug: ID;
  asset_platform_id: null;
  platforms: Platforms;
  detail_platforms: IDetailPlatforms;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: null;
  additional_notices: any[];
  localization: ITion;
  description: ITion;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: Date;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: IMarketData;
  community_data: ICommunityData;
  developer_data: IDeveloperData;
  status_updates: any[];
  last_updated: Date;
  tickers: Ticker[];
}

export interface ICommunityData {
  facebook_likes: null;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: null;
}

export interface ITion {
  en: string;
  de: string;
  es: string;
  fr: string;
  it: string;
  pl: string;
  ro: string;
  hu: string;
  nl: string;
  pt: string;
  sv: string;
  vi: string;
  tr: string;
  ru: string;
  ja: string;
  zh: string;
  'zh-tw': string;
  ko: string;
  ar: string;
  th: string;
  id: string;
  cs: string;
  da: string;
  el: string;
  hi: string;
  no: string;
  sk: string;
  uk: string;
  he: string;
  fi: string;
  bg: string;
  hr: string;
  lt: string;
  sl: string;
}

export interface IDetailPlatforms {
  '': IEmpty;
}

export interface IEmpty {
  decimal_place: null;
  contract_address: string;
}

export interface IDeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: ICodeAdditionsDeletions4_Weeks;
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series: any[];
}

export interface ICodeAdditionsDeletions4_Weeks {
  additions: number;
  deletions: number;
}

export enum ID {
  Avalanche2 = 'avalanche-2',
  Binancecoin = 'binancecoin',
  Bitcoin = 'bitcoin',
  Ethereum = 'ethereum',
  Solana = 'solana',
  WrappedBitcoin = 'wrapped-bitcoin',
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface Links {
  homepage: string[];
  whitepaper: string;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: ID;
  facebook_username: string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: ReposURL;
}

export interface ReposURL {
  github: string[];
  bitbucket: any[];
}

export interface IMarketData {
  current_price: { [key in CurrencyEnum]?: number };
  total_value_locked: null;
  mcap_to_tvl_ratio: null;
  fdv_to_tvl_ratio: null;
  roi: null;
  ath: { [key: string]: number };
  ath_change_percentage: { [key: string]: number };
  ath_date: { [key: string]: Date };
  atl: { [key: string]: number };
  atl_change_percentage: { [key: string]: number };
  atl_date: { [key: string]: Date };
  market_cap: { [key in CurrencyEnum]?: number };
  market_cap_rank: number;
  fully_diluted_valuation: { [key: string]: number };
  market_cap_fdv_ratio: number;
  total_volume: { [key in CurrencyEnum]?: number };
  high_24h: { [key: string]: number };
  low_24h: { [key: string]: number };
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: { [key in CurrencyEnum]?: number };
  price_change_percentage_1h_in_currency: { [key: string]: number };
  price_change_percentage_24h_in_currency: { [key in CurrencyEnum]?: number };
  price_change_percentage_7d_in_currency: { [key: string]: number };
  price_change_percentage_14d_in_currency: { [key: string]: number };
  price_change_percentage_30d_in_currency: { [key: string]: number };
  price_change_percentage_60d_in_currency: { [key: string]: number };
  price_change_percentage_200d_in_currency: { [key: string]: number };
  price_change_percentage_1y_in_currency: { [key: string]: number };
  market_cap_change_24h_in_currency: { [key: string]: number };
  market_cap_change_percentage_24h_in_currency: { [key: string]: number };
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  last_updated: Date;
}

export interface Platforms {
  '': string;
}

export interface Ticker {
  base: Base;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: { [key: string]: number };
  converted_volume: { [key: string]: number };
  trust_score: TrustScore;
  bid_ask_spread_percentage: number;
  timestamp: Date;
  last_traded_at: Date;
  last_fetch_at: Date;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: null | string;
  token_info_url: null;
  coin_id: ID;
  target_coin_id?: TargetCoinID;
}

export enum Base {
  Avax = 'AVAX',
  Bnb = 'BNB',
  Btc = 'BTC',
  Eth = 'ETH',
  Sol = 'SOL',
  Wbtc = 'WBTC',
}

export interface Market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}

export enum TargetCoinID {
  Bitcoin = 'bitcoin',
  FirstDigitalUsd = 'first-digital-usd',
  Tether = 'tether',
  TrueUsd = 'true-usd',
  UsdCoin = 'usd-coin',
}

export enum TrustScore {
  Green = 'green',
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toWelcome(json: string): ICoinDetail {
    return cast(JSON.parse(json), r('Welcome'));
  }

  public static welcomeToJson(value: ICoinDetail): string {
    return JSON.stringify(uncast(value, r('Welcome')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : '';
  const keyText = key ? ` for key "${key}"` : '';
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`,
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(', ')}]`;
    }
  } else if (typeof typ === 'object' && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent,
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l('array'), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l('Date'), val, key, parent);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue(l(ref || 'object'), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === 'object' && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
        ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty('props')
          ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Welcome: o(
    [
      { json: 'id', js: 'id', typ: r('ID') },
      { json: 'symbol', js: 'symbol', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'web_slug', js: 'web_slug', typ: r('ID') },
      { json: 'asset_platform_id', js: 'asset_platform_id', typ: null },
      { json: 'platforms', js: 'platforms', typ: r('Platforms') },
      { json: 'detail_platforms', js: 'detail_platforms', typ: r('DetailPlatforms') },
      { json: 'block_time_in_minutes', js: 'block_time_in_minutes', typ: 0 },
      { json: 'hashing_algorithm', js: 'hashing_algorithm', typ: '' },
      { json: 'categories', js: 'categories', typ: a('') },
      { json: 'preview_listing', js: 'preview_listing', typ: true },
      { json: 'public_notice', js: 'public_notice', typ: null },
      { json: 'additional_notices', js: 'additional_notices', typ: a('any') },
      { json: 'localization', js: 'localization', typ: r('Tion') },
      { json: 'description', js: 'description', typ: r('Tion') },
      { json: 'links', js: 'links', typ: r('Links') },
      { json: 'image', js: 'image', typ: r('Image') },
      { json: 'country_origin', js: 'country_origin', typ: '' },
      { json: 'genesis_date', js: 'genesis_date', typ: Date },
      { json: 'sentiment_votes_up_percentage', js: 'sentiment_votes_up_percentage', typ: 3.14 },
      { json: 'sentiment_votes_down_percentage', js: 'sentiment_votes_down_percentage', typ: 3.14 },
      { json: 'watchlist_portfolio_users', js: 'watchlist_portfolio_users', typ: 0 },
      { json: 'market_cap_rank', js: 'market_cap_rank', typ: 0 },
      { json: 'market_data', js: 'market_data', typ: r('MarketData') },
      { json: 'community_data', js: 'community_data', typ: r('CommunityData') },
      { json: 'developer_data', js: 'developer_data', typ: r('DeveloperData') },
      { json: 'status_updates', js: 'status_updates', typ: a('any') },
      { json: 'last_updated', js: 'last_updated', typ: Date },
      { json: 'tickers', js: 'tickers', typ: a(r('Ticker')) },
    ],
    false,
  ),
  CommunityData: o(
    [
      { json: 'facebook_likes', js: 'facebook_likes', typ: null },
      { json: 'twitter_followers', js: 'twitter_followers', typ: 0 },
      { json: 'reddit_average_posts_48h', js: 'reddit_average_posts_48h', typ: 0 },
      { json: 'reddit_average_comments_48h', js: 'reddit_average_comments_48h', typ: 0 },
      { json: 'reddit_subscribers', js: 'reddit_subscribers', typ: 0 },
      { json: 'reddit_accounts_active_48h', js: 'reddit_accounts_active_48h', typ: 0 },
      { json: 'telegram_channel_user_count', js: 'telegram_channel_user_count', typ: null },
    ],
    false,
  ),
  Tion: o(
    [
      { json: 'en', js: 'en', typ: '' },
      { json: 'de', js: 'de', typ: '' },
      { json: 'es', js: 'es', typ: '' },
      { json: 'fr', js: 'fr', typ: '' },
      { json: 'it', js: 'it', typ: '' },
      { json: 'pl', js: 'pl', typ: '' },
      { json: 'ro', js: 'ro', typ: '' },
      { json: 'hu', js: 'hu', typ: '' },
      { json: 'nl', js: 'nl', typ: '' },
      { json: 'pt', js: 'pt', typ: '' },
      { json: 'sv', js: 'sv', typ: '' },
      { json: 'vi', js: 'vi', typ: '' },
      { json: 'tr', js: 'tr', typ: '' },
      { json: 'ru', js: 'ru', typ: '' },
      { json: 'ja', js: 'ja', typ: '' },
      { json: 'zh', js: 'zh', typ: '' },
      { json: 'zh-tw', js: 'zh-tw', typ: '' },
      { json: 'ko', js: 'ko', typ: '' },
      { json: 'ar', js: 'ar', typ: '' },
      { json: 'th', js: 'th', typ: '' },
      { json: 'id', js: 'id', typ: '' },
      { json: 'cs', js: 'cs', typ: '' },
      { json: 'da', js: 'da', typ: '' },
      { json: 'el', js: 'el', typ: '' },
      { json: 'hi', js: 'hi', typ: '' },
      { json: 'no', js: 'no', typ: '' },
      { json: 'sk', js: 'sk', typ: '' },
      { json: 'uk', js: 'uk', typ: '' },
      { json: 'he', js: 'he', typ: '' },
      { json: 'fi', js: 'fi', typ: '' },
      { json: 'bg', js: 'bg', typ: '' },
      { json: 'hr', js: 'hr', typ: '' },
      { json: 'lt', js: 'lt', typ: '' },
      { json: 'sl', js: 'sl', typ: '' },
    ],
    false,
  ),
  DetailPlatforms: o([{ json: '', js: '', typ: r('Empty') }], false),
  Empty: o(
    [
      { json: 'decimal_place', js: 'decimal_place', typ: null },
      { json: 'contract_address', js: 'contract_address', typ: '' },
    ],
    false,
  ),
  DeveloperData: o(
    [
      { json: 'forks', js: 'forks', typ: 0 },
      { json: 'stars', js: 'stars', typ: 0 },
      { json: 'subscribers', js: 'subscribers', typ: 0 },
      { json: 'total_issues', js: 'total_issues', typ: 0 },
      { json: 'closed_issues', js: 'closed_issues', typ: 0 },
      { json: 'pull_requests_merged', js: 'pull_requests_merged', typ: 0 },
      { json: 'pull_request_contributors', js: 'pull_request_contributors', typ: 0 },
      {
        json: 'code_additions_deletions_4_weeks',
        js: 'code_additions_deletions_4_weeks',
        typ: r('CodeAdditionsDeletions4_Weeks'),
      },
      { json: 'commit_count_4_weeks', js: 'commit_count_4_weeks', typ: 0 },
      {
        json: 'last_4_weeks_commit_activity_series',
        js: 'last_4_weeks_commit_activity_series',
        typ: a('any'),
      },
    ],
    false,
  ),
  CodeAdditionsDeletions4_Weeks: o(
    [
      { json: 'additions', js: 'additions', typ: 0 },
      { json: 'deletions', js: 'deletions', typ: 0 },
    ],
    false,
  ),
  Image: o(
    [
      { json: 'thumb', js: 'thumb', typ: '' },
      { json: 'small', js: 'small', typ: '' },
      { json: 'large', js: 'large', typ: '' },
    ],
    false,
  ),
  Links: o(
    [
      { json: 'homepage', js: 'homepage', typ: a('') },
      { json: 'whitepaper', js: 'whitepaper', typ: '' },
      { json: 'blockchain_site', js: 'blockchain_site', typ: a('') },
      { json: 'official_forum_url', js: 'official_forum_url', typ: a('') },
      { json: 'chat_url', js: 'chat_url', typ: a('') },
      { json: 'announcement_url', js: 'announcement_url', typ: a('') },
      { json: 'twitter_screen_name', js: 'twitter_screen_name', typ: r('ID') },
      { json: 'facebook_username', js: 'facebook_username', typ: '' },
      { json: 'bitcointalk_thread_identifier', js: 'bitcointalk_thread_identifier', typ: null },
      { json: 'telegram_channel_identifier', js: 'telegram_channel_identifier', typ: '' },
      { json: 'subreddit_url', js: 'subreddit_url', typ: '' },
      { json: 'repos_url', js: 'repos_url', typ: r('ReposURL') },
    ],
    false,
  ),
  ReposURL: o(
    [
      { json: 'github', js: 'github', typ: a('') },
      { json: 'bitbucket', js: 'bitbucket', typ: a('any') },
    ],
    false,
  ),
  MarketData: o(
    [
      { json: 'current_price', js: 'current_price', typ: m(3.14) },
      { json: 'total_value_locked', js: 'total_value_locked', typ: null },
      { json: 'mcap_to_tvl_ratio', js: 'mcap_to_tvl_ratio', typ: null },
      { json: 'fdv_to_tvl_ratio', js: 'fdv_to_tvl_ratio', typ: null },
      { json: 'roi', js: 'roi', typ: null },
      { json: 'ath', js: 'ath', typ: m(3.14) },
      { json: 'ath_change_percentage', js: 'ath_change_percentage', typ: m(3.14) },
      { json: 'ath_date', js: 'ath_date', typ: m(Date) },
      { json: 'atl', js: 'atl', typ: m(3.14) },
      { json: 'atl_change_percentage', js: 'atl_change_percentage', typ: m(3.14) },
      { json: 'atl_date', js: 'atl_date', typ: m(Date) },
      { json: 'market_cap', js: 'market_cap', typ: m(3.14) },
      { json: 'market_cap_rank', js: 'market_cap_rank', typ: 0 },
      { json: 'fully_diluted_valuation', js: 'fully_diluted_valuation', typ: m(3.14) },
      { json: 'market_cap_fdv_ratio', js: 'market_cap_fdv_ratio', typ: 3.14 },
      { json: 'total_volume', js: 'total_volume', typ: m(3.14) },
      { json: 'high_24h', js: 'high_24h', typ: m(3.14) },
      { json: 'low_24h', js: 'low_24h', typ: m(3.14) },
      { json: 'price_change_24h', js: 'price_change_24h', typ: 0 },
      { json: 'price_change_percentage_24h', js: 'price_change_percentage_24h', typ: 3.14 },
      { json: 'price_change_percentage_7d', js: 'price_change_percentage_7d', typ: 3.14 },
      { json: 'price_change_percentage_14d', js: 'price_change_percentage_14d', typ: 3.14 },
      { json: 'price_change_percentage_30d', js: 'price_change_percentage_30d', typ: 3.14 },
      { json: 'price_change_percentage_60d', js: 'price_change_percentage_60d', typ: 3.14 },
      { json: 'price_change_percentage_200d', js: 'price_change_percentage_200d', typ: 3.14 },
      { json: 'price_change_percentage_1y', js: 'price_change_percentage_1y', typ: 3.14 },
      { json: 'market_cap_change_24h', js: 'market_cap_change_24h', typ: 0 },
      {
        json: 'market_cap_change_percentage_24h',
        js: 'market_cap_change_percentage_24h',
        typ: 3.14,
      },
      { json: 'price_change_24h_in_currency', js: 'price_change_24h_in_currency', typ: m(3.14) },
      {
        json: 'price_change_percentage_1h_in_currency',
        js: 'price_change_percentage_1h_in_currency',
        typ: m(3.14),
      },
      {
        json: 'price_change_percentage_24h_in_currency',
        js: 'price_change_percentage_24h_in_currency',
        typ: m(3.14),
      },
      {
        json: 'price_change_percentage_7d_in_currency',
        js: 'price_change_percentage_7d_in_currency',
        typ: m(3.14),
      },
      {
        json: 'price_change_percentage_14d_in_currency',
        js: 'price_change_percentage_14d_in_currency',
        typ: m(3.14),
      },
      {
        json: 'price_change_percentage_30d_in_currency',
        js: 'price_change_percentage_30d_in_currency',
        typ: m(3.14),
      },
      {
        json: 'price_change_percentage_60d_in_currency',
        js: 'price_change_percentage_60d_in_currency',
        typ: m(3.14),
      },
      {
        json: 'price_change_percentage_200d_in_currency',
        js: 'price_change_percentage_200d_in_currency',
        typ: m(3.14),
      },
      {
        json: 'price_change_percentage_1y_in_currency',
        js: 'price_change_percentage_1y_in_currency',
        typ: m(3.14),
      },
      {
        json: 'market_cap_change_24h_in_currency',
        js: 'market_cap_change_24h_in_currency',
        typ: m(3.14),
      },
      {
        json: 'market_cap_change_percentage_24h_in_currency',
        js: 'market_cap_change_percentage_24h_in_currency',
        typ: m(3.14),
      },
      { json: 'total_supply', js: 'total_supply', typ: 0 },
      { json: 'max_supply', js: 'max_supply', typ: 0 },
      { json: 'circulating_supply', js: 'circulating_supply', typ: 0 },
      { json: 'last_updated', js: 'last_updated', typ: Date },
    ],
    false,
  ),
  Platforms: o([{ json: '', js: '', typ: '' }], false),
  Ticker: o(
    [
      { json: 'base', js: 'base', typ: r('Base') },
      { json: 'target', js: 'target', typ: '' },
      { json: 'market', js: 'market', typ: r('Market') },
      { json: 'last', js: 'last', typ: 3.14 },
      { json: 'volume', js: 'volume', typ: 3.14 },
      { json: 'converted_last', js: 'converted_last', typ: m(3.14) },
      { json: 'converted_volume', js: 'converted_volume', typ: m(3.14) },
      { json: 'trust_score', js: 'trust_score', typ: r('TrustScore') },
      { json: 'bid_ask_spread_percentage', js: 'bid_ask_spread_percentage', typ: 3.14 },
      { json: 'timestamp', js: 'timestamp', typ: Date },
      { json: 'last_traded_at', js: 'last_traded_at', typ: Date },
      { json: 'last_fetch_at', js: 'last_fetch_at', typ: Date },
      { json: 'is_anomaly', js: 'is_anomaly', typ: true },
      { json: 'is_stale', js: 'is_stale', typ: true },
      { json: 'trade_url', js: 'trade_url', typ: u(null, '') },
      { json: 'token_info_url', js: 'token_info_url', typ: null },
      { json: 'coin_id', js: 'coin_id', typ: r('ID') },
      { json: 'target_coin_id', js: 'target_coin_id', typ: u(undefined, r('TargetCoinID')) },
    ],
    false,
  ),
  Market: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'identifier', js: 'identifier', typ: '' },
      { json: 'has_trading_incentive', js: 'has_trading_incentive', typ: true },
    ],
    false,
  ),
  ID: ['avalanche-2', 'binancecoin', 'bitcoin', 'ethereum', 'solana', 'wrapped-bitcoin'],
  Base: ['AVAX', 'BNB', 'BTC', 'ETH', 'SOL', 'WBTC'],
  TargetCoinID: ['bitcoin', 'first-digital-usd', 'tether', 'true-usd', 'usd-coin'],
  TrustScore: ['green'],
};

export interface ICoinDescription {
  ko: string | null;
  en: string | null;
}
