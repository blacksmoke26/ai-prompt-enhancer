/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';
import {Boxes} from 'lucide-react';

// hooks
import {useDataStore} from '~/stores/dataStore';

// services
import PromptTemplateService, {GetTemplatesParams} from '~/services/PromptTemplateService';

// components
import TemplatesEditor, {PromptTemplate} from '~/components/TemplatesEditor';

// types
import type {PromptTemplateCategories, PromptTemplateResponse} from '~/types';
import type {AdvancedTextareaProps} from '~/components/ui/AdvancedTextarea';
import type {TemplateSelectorProps} from '~/components/TemplatesEditor/TemplateSelector';

/**
 * Converts raw category data into the format expected by the TemplateSelector component.
 * @param categories - The list of prompt categories to transform.
 * @returns An array of category objects compatible with TemplateSelector.
 */
const toCategories = (categories: PromptTemplateCategories[]): TemplateSelectorProps['categories'] => {
  return categories.map(cat => ({
    id: String(cat.id),
    name: cat.label,
    icon: Boxes,
  }));
};

/**
 * Props for the Composer component.
 */
export interface ComposerProps {
}

/**
 * Composer component for managing prompt templates and categories.
 * @returns {JSX.Element} The rendered Composer component.
 */
const Composer: React.FC<ComposerProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const {promptCategories, promptTemplates, setPromptTemplates} = useDataStore();

  const toPromptTemplate = (templatesList: PromptTemplateResponse[]) => {
    return templatesList.map(x => {
      const category = promptCategories.find(c => c.id === x.categoryId)?.label!;
      return ({
        ...x,
        content: x.content.replace(/\n+/g, `\n`),
        category,
      });
    }) as unknown as PromptTemplate[];
  };

  const onTagClick = async (tag: string) => {
    setLoading(true);
    setSelectedTag(tag);
    await PromptTemplateService.getTemplates({tag}).then(setPromptTemplates);
    setLoading(false);
  };


  return (
    <div className="p-4">
      <TemplatesEditor
        onTagClick={onTagClick}
        maxLength={2000}
        onValidate={(data) => {
          console.log('Data', data);
        }}
        onExecuteClick={() => {
          console.log('XXX');
        }}
        onValidSubmit={(variables) =>{
          console.log(variables);
        }}
        editorProps={{isLoading: loading} as AdvancedTextareaProps} templateSelector={{
        loading,
        onTagClick,
        categories: toCategories(promptCategories),
        onCategoryChange: async id => {
          setLoading(true);
          setSelectedCategory(+id);
          await PromptTemplateService.getTemplates({
            categoryId: +id, page: 1,
          }).then(setPromptTemplates);
          setLoading(false);
        },
        onSearch: async (query: string) => {
          if (!query.trim()) return;

          const params: GetTemplatesParams = {
            search: query,
          };

          if (selectedTag) {
            params.tag = selectedTag;
          }

          if (selectedCategory) {
            params.categoryId = selectedCategory;
          }

          await PromptTemplateService.getTemplates(params).then(setPromptTemplates);
        },
        loadingCategories: false,
        selectorProps: {
          enablePinned: false,
          enableRecents: false,
          enableFavorites: false,
          itemsPerPage: 20,
        },
      } as Partial<TemplateSelectorProps>} templates={toPromptTemplate(promptTemplates)}/>
    </div>
  );
};

export default Composer;
