import ServicePageLayout from './ServicePageLayout';
import { PageId } from '../../types';

interface PageProps {
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

export default function FreshProducePage(props: PageProps) {
  return <ServicePageLayout serviceId="fresh-produce" {...props} />;
}
