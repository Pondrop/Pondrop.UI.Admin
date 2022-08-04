import { BreadcrumbContainer } from './styles';
import { IBreadCrumbProps } from './types';

const Breadcrumb = ({ links, separator, customSeparator }: IBreadCrumbProps) => {
  return (
    <BreadcrumbContainer customSeparator={customSeparator} breadcrumbImg={Object.keys(links[0]).includes('image')}>
      {links.map((item, index) => {
        return (
          <li key={index}>
            {item.image ? item.image : ''}
            <p>{item.label}</p>
            <span>{!customSeparator ? (separator ? separator : '/') : ''}</span>
          </li>
        );
      })}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
