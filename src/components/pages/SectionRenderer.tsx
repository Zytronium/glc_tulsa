import { TextImageBlock } from "./blocks/TextImageBlock";
import { QuoteBlock } from "./blocks/QuoteBlock";
import { CardsBlock } from "./blocks/CardsBlock";
import { CtaBlock } from "./blocks/CtaBlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { PageHeroBlock } from "./blocks/PageHeroBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { EmbedBlock } from "./blocks/EmbedBlock";

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
};

type Props = {
  sections: (Record<string, unknown> | null)[];
};

export function SectionRenderer({ sections }: Props) {
  console.log("sections from Tina:", JSON.stringify(sections, null, 2));
  return (
    <>
      {sections.map((section, i) => {
        if (!section) {
          console.log("no section");
          return null;
        }

        const typename = (section as { __typename?: string }).__typename ?? "";
        // strip whatever prefix Tina adds, keeping just the template name, lowercased first letter
        const stripped = typename.replace(/^.*Sections/, "");
        const templateName = stripped.charAt(0).toLowerCase() + stripped.slice(1);
        const Component = BLOCK_COMPONENTS[templateName];

        if (!Component) {
          console.log("no component for ", typename, " - ", templateName, " - ", section, " -");
          return null
        };
        return <Component key={i} section={section} />;
      })}
    </>
  );
}
