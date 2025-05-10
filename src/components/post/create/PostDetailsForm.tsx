'use client'

import React from 'react';
import { Input, Textarea, Chip, Select, SelectItem, Switch, Card } from '@nextui-org/react';
import { Tier } from '@/utils/api/tierApi';
import { useFormContext, Controller } from 'react-hook-form';

interface PostDetailsFormProps {
  tiers: Tier[];
  tiersLoading: boolean;
  seriesList: any[];
  seriesLoading: boolean;
}

const PostDetailsForm: React.FC<PostDetailsFormProps> = ({
  tiers,
  tiersLoading,
  seriesList,
  seriesLoading,
}) => {
  const { control, watch, setValue, formState: { errors } } = useFormContext();
  const [currentTag, setCurrentTag] = React.useState('');
  const tags = watch('tags') || [];
  
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim() && !tags.includes(currentTag.trim())) {
      setValue('tags', [...tags, currentTag.trim()]);
      setCurrentTag('');
      e.preventDefault();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', tags.filter((tag: string) => tag !== tagToRemove));
  };

  const tagErrorMessage = errors.tags?.message as string;
  const isTagsInvalid = !!errors.tags;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Post Details</h2>
      
      <div className="space-y-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              label="Title"
              placeholder="Enter your post title"
              {...field}
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message as string}
              isRequired
            />
          )}
        />
        
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Description"
              placeholder="Add some details about your post..."
              className="min-h-[100px]"
              {...field}
              isInvalid={!!errors.text}
              errorMessage={errors.text?.message as string}
              isRequired
            />
          )}
        />
        
        <div>
          <Input
            label="Tags (Required)"
            placeholder="Add tags and press Enter"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleAddTag}
            isInvalid={isTagsInvalid}
            errorMessage={tagErrorMessage}
            isRequired
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag: string) => (
                <Chip
                  key={tag}
                  onClose={() => removeTag(tag)}
                  variant="flat"
                >
                  #{tag}
                </Chip>
              ))}
            </div>
          )}
          {tags.length === 0 && !isTagsInvalid && (
            <div className="mt-1 text-sm text-gray-500">
              At least one tag is required
            </div>
          )}
        </div>
        
        <Controller
          name="minTierId"
          control={control}
          render={({ field }) => (
            <Select
              label="Minimum Tier"
              placeholder={tiers.length === 0 ? "No tiers available" : "Select required tier to view"}
              {...field}
              className="w-full"
              isLoading={tiersLoading}
              isInvalid={!!errors.minTierId}
              errorMessage={errors.minTierId?.message as string}
              isDisabled={tiers.length === 0}
            >
              {tiers.length > 0 ? (
                tiers.map((tier: Tier) => (
                  <SelectItem 
                    key={tier.id} 
                    value={tier.id} 
                    textValue={`${tier.name} ${tier.price} dollars`}
                  >
                    {tier.name} (${tier.price})
                  </SelectItem>
                ))
              ) : (
                <SelectItem key="none" value="" textValue="No tiers available" isDisabled>
                  No tiers available
                </SelectItem>
              )}
            </Select>
          )}
        />
        
        <Controller
          name="seriesId"
          control={control}
          render={({ field }) => (
            <Select
              label="Series"
              placeholder={seriesList.length === 0 ? "No series available" : "Select a series"}
              {...field}
              className="w-full"
              isLoading={seriesLoading}
              isInvalid={!!errors.seriesId}
              errorMessage={errors.seriesId?.message as string}
              isDisabled={seriesList.length === 0}
            >
              {seriesList.length > 0 ? (
                seriesList.map(series => (
                  <SelectItem 
                    key={series.id} 
                    value={series.id}
                    textValue={series.name}
                  >
                    {series.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem key="none" value="" textValue="No series available" isDisabled>
                  No series available
                </SelectItem>
              )}
            </Select>
          )}
        />
        
        <Controller
          name="nsfw"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="flex items-center gap-2">
              <Switch
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              />
              <span>Mark as NSFW</span>
            </div>
          )}
        />
      </div>
    </Card>
  );
};

export default PostDetailsForm;
