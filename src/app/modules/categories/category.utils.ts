import { Category } from './category.model';

function createSlugRegex(slug: string) {
    const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escapedSlug}(-[1-9])?$`);
}

export const generateCategorySlug = async (title: string) => {
    const slug = title.toLowerCase().trim().split(' ').join('-');

    const lastItemWithThisSlug = await Category.findOne({
        slug: { $regex: createSlugRegex(slug), $options: 'i' },
    }).sort({ createdAt: -1 });

    if (!lastItemWithThisSlug) {
        return slug;
    }

    const slugSplit = lastItemWithThisSlug.slug.split('-');
    const lastItemNumber = slugSplit[slugSplit.length - 1];
    const lastItemNumberInt = parseInt(lastItemNumber) || 0;

    return `${slug}-${lastItemNumberInt + 1}`;
};
