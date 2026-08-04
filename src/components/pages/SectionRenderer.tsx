import { TextImageBlock } from "./blocks/TextImageBlock";
import { QuoteBlock } from "./blocks/QuoteBlock";
import { CardsBlock } from "./blocks/CardsBlock";
import { CtaBlock } from "./blocks/CtaBlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { PageHeroBlock } from "./blocks/PageHeroBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { EmbedBlock } from "./blocks/EmbedBlock";
import { GroupBlock } from "./blocks/GroupBlock";

// -------- maps each template's Tina discriminator to its component --------
const BLOCK_COMPONENTS: Record<string, React.ComponentType<{ section: any }>> = {
  textImageBlock: TextImageBlock,
  quoteBlock: QuoteBlock,
  cardsBlock: CardsBlock,
  ctaBlock: CtaBlock,
  heroBlock: HeroBlock,
  pageHeroBlock: PageHeroBlock,
  imageBlock: ImageBlock,
  embedBlock: EmbedBlock,
  sectionGroupBlock: GroupBlock,
};

type Props = {
  sections: (Record<string, unknown> | null)[];
  // true when rendering inside a section group's slot
  nested?: boolean; // will use later in future version to remove borders on nested sections
};

export function SectionRenderer({ sections, nested }: Props) {
  return (
    <>
      {sections.map((section, i) => {
        if (!section) return null;

        const typename = (section as { __typename?: string }).__typename ?? "";
        // strip whatever prefix Tina adds, keeping just the template name, lowercased first letter
        const stripped = typename.replace(/^.*Sections/, "");
        const templateName = stripped.charAt(0).toLowerCase() + stripped.slice(1);
        const Component = BLOCK_COMPONENTS[templateName];

        if (!Component) return null;

        return <Component key={i} section={section} />;
      })}
    </>
  );
}
