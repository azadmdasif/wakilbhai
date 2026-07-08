import {
  PropertyIcon,
  FamilyIcon,
  RupeeIcon,
  ShoppingCartIcon,
  BanknoteIcon,
  ShieldIcon,
  GlobeIcon,
  CarIcon,
  BriefcaseIcon,
  GovernmentIcon,
  DocumentIcon,
} from './Icons';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  property: PropertyIcon,
  family: FamilyIcon,
  money: RupeeIcon,
  consumer: ShoppingCartIcon,
  job: BanknoteIcon,
  police: ShieldIcon,
  cyber: GlobeIcon,
  vehicle: CarIcon,
  business: BriefcaseIcon,
  government: GovernmentIcon,
};

export default function CategoryIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = ICONS[icon] ?? DocumentIcon;
  return <Icon className={className} />;
}
