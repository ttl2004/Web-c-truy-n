package com.project.ReadStory.Mapper;

import com.project.ReadStory.dto.request.StoryCreationRequest;
import com.project.ReadStory.dto.request.StoryUpdateRequest;
import com.project.ReadStory.dto.request.UserUpdateRequest;
import com.project.ReadStory.dto.response.StoryResponse;
import com.project.ReadStory.dto.response.UserResponse;
import com.project.ReadStory.entity.Story;
import com.project.ReadStory.entity.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface StoryMapper {
    Story toStory(StoryCreationRequest request);
    StoryResponse toStoryResponse(Story story);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateStory(@MappingTarget Story story, StoryUpdateRequest request);
}
