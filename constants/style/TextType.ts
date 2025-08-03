import { TextStyle } from 'react-native';

export enum TextType {
  Default = 'default',
  Title = 'title',
  DefaultSemiBold = 'defaultSemiBold',
  Subtitle = 'subtitle',
  Link = 'link',
}

const defaultTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 24,
};

const defaultSemiBoldTextStyle: TextStyle = {
  ...defaultTextStyle,
  fontWeight: '600',
};

const titleTextStyle: TextStyle = {
  fontSize: 32,
  fontWeight: 'bold',
  lineHeight: 32,
};

const subtitleTextStyle: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
};

const linkTextStyle: TextStyle = {
  lineHeight: 30,
  fontSize: 16,
};

export const TextTypeStyles = {
  default: defaultTextStyle,
  defaultSemiBold: defaultSemiBoldTextStyle,
  title: titleTextStyle,
  subtitle: subtitleTextStyle,
  link: linkTextStyle,
};
