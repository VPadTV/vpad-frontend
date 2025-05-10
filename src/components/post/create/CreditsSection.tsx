'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Input, Avatar } from '@nextui-org/react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { searchUsersByUsername, clearSearchResults } from '@/redux/features/userSlice';
import { User } from '@/utils/api/userApi';
import debounce from 'lodash/debounce';

interface CreditItem {
  userId: string;
  description: string;
  nickname?: string;
  profilePhotoUrl?: string | null;
}

interface FormValues {
  credits: CreditItem[];
}

export interface Credit {
  userId: string;
  description: string;
  nickname?: string;
  profilePhotoUrl?: string | null;
}

const CreditsSection: React.FC = () => {
  const { control, formState: { errors }, setValue } = useFormContext<FormValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'credits',
  });
  
  const dispatch = useAppDispatch();
  const { searchResults, loading } = useAppSelector((state) => state.user);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const normalizedSearchResults = Array.isArray(searchResults) ? searchResults : (searchResults ? [searchResults] : []);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const debouncedSearch = useRef(
    debounce((term: string) => {
      if (term.length > 1) {
        dispatch(searchUsersByUsername(term));
        setDropdownOpen(true);
      } else {
        dispatch(clearSearchResults());
        setDropdownOpen(false);
      }
    }, 300)
  ).current;
  
  const handleSearchChange = (value: string, index: number) => {
    setActiveIndex(index);
    debouncedSearch(value);
  };
  
  const handleSelectUser = (user: User, index: number) => {
    const currentField = fields[index];
    update(index, {
      ...currentField,
      userId: user.id,
      // Keep existing description
      description: currentField.description || '',
      // Store these only for display purposes
      nickname: user.nickname,
      profilePhotoUrl: user.profilePhotoUrl || '',
    });
    setDropdownOpen(false);
    dispatch(clearSearchResults());
  };

  // Show dropdown when search results are available
  useEffect(() => {
    if (normalizedSearchResults.length > 0) {
      setDropdownOpen(true);
    }
  }, [normalizedSearchResults]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Credits</h2>
      
      {fields.map((field, index) => (
        <div key={field.id} className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex-1">
              <div className="relative" ref={dropdownRef}>
                <Controller
                  control={control}
                  name={`credits.${index}.nickname`}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        label="Username"
                        placeholder="Search for a user"
                        value={field.value || ''}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleSearchChange(e.target.value, index);
                        }}
                        onFocus={() => {
                          setActiveIndex(index);
                          const value = field.value || '';
                          if (value.length > 1) {
                            setDropdownOpen(true);
                          }
                        }}
                        className="w-full"
                        classNames={{
                          base: "w-full",
                          mainWrapper: "w-full",
                          input: "pl-7",
                          inputWrapper: "w-full"
                        }}
                        startContent={
                          <div className="pointer-events-none flex items-center h-full pl-3 pt-5">
                            <span className="text-default-400">@</span>
                          </div>
                        }
                        isInvalid={!!errors.credits?.[index]?.userId}
                        errorMessage={errors.credits?.[index]?.userId?.message as string}
                      />
                    </div>
                  )}
                />
                
                {dropdownOpen && activeIndex === index && (
                  <div className="absolute left-0 right-0 z-[9999] mt-1 bg-background rounded-md shadow-lg overflow-auto border border-divider" style={{ maxHeight: '300px' }}>
                    {loading ? (
                      <div className="p-3 text-center text-default-500">Loading...</div>
                    ) : normalizedSearchResults.length > 0 ? (
                      normalizedSearchResults.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center p-3 hover:bg-content2 cursor-pointer"
                          onClick={() => handleSelectUser(user, index)}
                        >
                          <Avatar
                            src={user.profilePhotoUrl || '/default-avatar.png'}
                            alt={user.nickname || 'User'}
                            className="mr-3"
                            size="sm"
                          />
                          <div>
                            <div className="font-medium text-foreground">{user.nickname || 'Unnamed User'}</div>
                            <div className="text-xs text-default-500">@{user.nickname}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-default-500">No users found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <Input
              label="Description"
              placeholder="Enter credit description"
              {...control.register(`credits.${index}.description`)}
              isInvalid={!!errors.credits?.[index]?.description}
              errorMessage={errors.credits?.[index]?.description?.message as string}
              className="flex-1"
            />
            
            <input
              type="hidden"
              {...control.register(`credits.${index}.userId`)}
            />
            
            <Button 
              color="danger" 
              variant="flat" 
              onPress={() => remove(index)}
              className="mt-auto mb-0 md:mb-2 h-12"
            >
              Remove
            </Button>
          </div>
          
          {field.userId && field.nickname && (
            <div className="flex items-center p-2 bg-content1 rounded-md">
              <Avatar
                src={field.profilePhotoUrl || '/default-avatar.png'}
                alt={field.nickname}
                className="mr-2"
                size="sm"
              />
              <div>
                <div className="font-medium text-foreground">@{field.nickname}</div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <Button 
        color="primary" 
        variant="flat" 
        onPress={() => append({ userId: '', description: '', nickname: '', profilePhotoUrl: '' })}
        className="mt-2"
      >
        Add Credit
      </Button>
    </Card>
  );
};

export default CreditsSection;
