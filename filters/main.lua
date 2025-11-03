package.path = package.path .. ';filters/missions.lua;filters/animations.lua;filters/profil.lua;filters/projects.lua;filters/experiences.lua;filters/educations.lua;filters/publications.lua;filters/coordinations.lua;filters/lectures.lua;filters/reviews.lua;filters/theses.lua;filters/supervisions.lua'

local Profil = require("filters.profil")
local Projects = require("filters.projects")
local Experiences = require("filters.experiences")
local Educations = require("filters.educations")
local Publications = require("filters.publications")
local Lectures = require("filters.lectures")
local Coordinations = require("filters.coordinations")
local Reviews = require("filters.reviews")
local Supervisions = require("filters.supervisions")
local Animations = require("filters.animations")
local Theses = require("filters.theses")
local Missions = require("filters.missions")

local function has_class(block, cls)
  return block and block.classes and pandoc.List.includes(block.classes, cls)
end

-- render and replace a Div (returns a pandoc block to replace the Div)
local function render_div_for_class(class, metadata)
  if class == "profil" then
    quarto.log.output("========== .profil div ==========")
    return pandoc.RawBlock("html", Profil.render(metadata, false))
  elseif class == "projects" then
    quarto.log.output("========== .projects div ==========")
    return pandoc.RawBlock("html", Projects.render(metadata, false))
  elseif class == "experiences" then
    quarto.log.output("========== .experiences div ==========")
    return pandoc.RawBlock("html", Experiences.render(metadata, false))
  elseif class == "educations" then
    quarto.log.output("========== .educations div ==========")
    return pandoc.RawBlock("html", Educations.render(metadata, false))
  elseif class == "publications" then
    quarto.log.output("========== .publications div ==========")
    return pandoc.RawBlock("html", Publications.render(metadata, false))
  elseif class == "lectures" then
    quarto.log.output("========== .lectures div ==========")
    return pandoc.RawBlock("html", Lectures.render(metadata, false))
  elseif class == "coordinations" then
    quarto.log.output("========== .coordinations div ==========")
    return pandoc.RawBlock("html", Coordinations.render(metadata, false))
  elseif class == "reviews" then
    quarto.log.output("========== .reviews div ==========")
    return pandoc.RawBlock("html", Reviews.render(metadata, false))
  elseif class == "supervisions" then
    quarto.log.output("========== .supervisions div ==========")
    return pandoc.RawBlock("html", Supervisions.render(metadata, false))
  elseif class == "animations" then
    quarto.log.output("========== .animations div ==========")
    return pandoc.RawBlock("html", Animations.render(metadata, false))
  elseif class == "theses" then
    quarto.log.output("========== .theses div ==========")
    return pandoc.RawBlock("html", Theses.render(metadata, false))
  elseif class == "missions" then
    quarto.log.output("========== .missions div ==========")
    return pandoc.RawBlock("html", Missions.render(metadata, false))
  end
  return nil
end

-- Recursively traverse a list of blocks and replace matching Divs in-place.
local function traverse_blocks(blocks, metadata)
  for i = 1, #blocks do
    local block = blocks[i]

    -- Only Divs can carry classes, so check them first
    if block.t == "Div" then
      -- if this Div has any of the classes we want, replace it
      local classes_to_check = { "profil", "projects", "experiences", "educations", "publications", "lectures", "coordinations", "reviews", "supervisions", "animations", "missions", "theses"}
      local replaced = false
      for _, cls in ipairs(classes_to_check) do
        if has_class(block, cls) then
          local replacement = render_div_for_class(cls, metadata)
          if replacement then
            blocks[i] = replacement
            replaced = true
            break
          end
        end
      end

      -- if we replaced this Div, continue to next sibling (don't recurse into it)
      if replaced then
        goto continue
      end

      -- otherwise, recurse into its children (support either .content or .blocks)
      local children = block.content or block.blocks
      if children and type(children) == "table" and #children > 0 then
        traverse_blocks(children, metadata)
      end
    else
      -- non-Div blocks might contain nested blocks in some cases (e.g. BlockQuote has .content)
      -- attempt to recurse generically when possible
      local children = block.content or block.blocks
      if children and type(children) == "table" and #children > 0 then
        traverse_blocks(children, metadata)
      end
    end

    ::continue::
  end
end

function Pandoc(doc)
  local metadata = doc.meta or {}
  traverse_blocks(doc.blocks, metadata)
  return doc
end