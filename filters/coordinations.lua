local Coordinations = {}

-- Function to trim whitespace from both ends
function trim(s)
    return s:match("^%s*(.-)%s*$")
end

-- Function to split a string by a delimiter (comma)
function split_and_trim(inputstr, sep)
    sep = sep or ","  -- default separator is comma
    local t = {}
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
        table.insert(t, trim(str))
    end
    return t
end

function ref_to_markdown(ref)
  if not ref then
    return ""
  end

  if type(ref) == "string" then
    -- Already Markdown
    return ref

  elseif type(ref) == "table" then
    -- Could be a list of inlines or a single element
    if ref.t then
      -- Single element
      return pandoc.write(pandoc.Pandoc({pandoc.Para({ref})}), "markdown")
    else
      -- List of inlines
      return pandoc.write(pandoc.Pandoc({pandoc.Para(ref)}), "markdown")
    end
  end

  return ""
end

function Coordinations.render(metadata, debug)
    local printable = metadata.printable or false
    local lang = pandoc.utils.stringify(metadata.lang) or "en"
    local coordination_title = pandoc.utils.stringify(metadata.coordinations.titles.title[lang] or "Coordinations")
    local coordinations = metadata.coordinations.items or {}
    local coordinations_html = ""
      for _, coordination in ipairs(coordinations) do
        if debug then
            quarto.log.output(coordination) 
        end

        local name = pandoc.utils.stringify(coordination.name[lang] or "")
        local period = pandoc.utils.stringify(coordination.period[lang] or "")
        local volume = pandoc.utils.stringify(coordination.volume[lang] or "")
        local level = pandoc.utils.stringify(coordination.level[lang] or "")
        local location = pandoc.utils.stringify(coordination.location[lang] or "")
        local tools = coordination.tools[lang] or {}
        local tools_html = ""
        for k, tool in ipairs(tools) do
            tools_html = tools_html .. string.format([[
            <span class="badge bg-light">%s</span>
            ]], pandoc.utils.stringify(tool or ""));
        end

        local responsibilities = coordination.responsibilities[lang] or {}
        local responsabilities_title = pandoc.utils.stringify(metadata.coordinations.titles.categories[lang][5] or "responsabilities")
        local responsibilities_html = ""
        if #responsibilities > 0 then
          for j, responsibility in ipairs(responsibilities) do
              responsibilities_html = responsibilities_html .. string.format([[
                  <li>%s</li>
              ]], pandoc.utils.stringify(responsibility or ""))
          end
          responsibilities_html = string.format([[<div class="text-start"><i class="bi bi-bullseye"></i> <b>%s:</b><ul style="margin-bottom:0.25rem;">%s</ul></div>]], responsabilities_title, responsibilities_html)
        
        end
        
        local materials_title = pandoc.utils.stringify(metadata.coordinations.titles.categories[lang][6] or "materials")
        local links = coordination.links or {}
        local links_html = ""
        if #links > 0 then
          for j, link in ipairs(links) do
              local text = pandoc.utils.stringify(link.text[lang] or "")
              local href = pandoc.utils.stringify(link.href or "")
              if j == #links then
                  links_html = links_html .. string.format([[ <a href="%s" target="_blank">%s <i class="bi bi-box-arrow-up-right" style="font-size:0.8em;"></i></a> ]], href, text)
              else
                  links_html = links_html .. string.format([[ <a href="%s" target="_blank">%s <i class="bi bi-box-arrow-up-right" style="font-size:0.8em;"></i></a>, ]], href, text)
              end
          end
          links_html = string.format([[<div class="text-start"><i class="bi bi-bullseye"></i> <b>%s:</b>%s</div>]], materials_title, links_html)
        end

        local aavs = coordination.aavs[lang] or {}
        local aavs_html = ""
        for j, aav in ipairs(aavs) do
            local md_aav = pandoc.write(pandoc.Pandoc({pandoc.Para(aav)}), "markdown")
            local parsed_aav = pandoc.read(md_aav, "markdown")
            local final_aav = pandoc.write(parsed_aav, "html")
            final_aav = final_aav:gsub("^<p>", ""):gsub("</p>%s*$", "")
            aavs_html = aavs_html..string.format([[
                <li>%s</li>
            ]], final_aav)
        end


        -- local md_ref = pandoc.write(pandoc.Pandoc({pandoc.Para(coordination.ref)}), "markdown")
        -- local parsed_ref = pandoc.read(md_ref, "markdown")
        -- local ref = pandoc.write(parsed_ref, "html")
        -- ref = ref:gsub("^<p>", ""):gsub("</p>%s*$", "")

        local level_title = pandoc.utils.stringify(metadata.coordinations.titles.categories[lang][1] or "level")
        local location_title = pandoc.utils.stringify(metadata.coordinations.titles.categories[lang][2] or "location")
        local volume_title = pandoc.utils.stringify(metadata.coordinations.titles.categories[lang][3] or "volume")
        local goals_title = pandoc.utils.stringify(metadata.coordinations.titles.categories[lang][4] or "goals")

        coordinations_html = coordinations_html .. string.format([[
            <div class="g-col-12 g-col-sm-12 g-col-md-12 g-col-lg-6">
                <div class="text-start" style="font-size: 1.25rem;font-weight: 400;line-height: 1.2;">%s</div>
                <div class="text-start" style="font-size: 1rem;font-weight: 400; line-height: 1; opacity:0.75;">%s</div>
                <div class="text-start" style="margin-bottom:0.5rem;">%s</div>
                <div class="text-start"><i class="bi bi-bookmark-fill"></i> <b>%s:</b> %s</div>
                <div class="text-start"><i class="bi bi-geo-alt-fill"></i> <b>%s:</b> %s</div>
                <div class="text-start"><i class="bi bi-stopwatch"></i> <b>%s:</b> %s</div>
                <div class="text-start"><i class="bi bi-bullseye"></i> <b>%s:</b><ul style="margin-bottom:0.25rem;">%s</ul></div>
                %s
                %s
            </div>
        ]], name, period, tools_html, level_title, level, location_title, location, volume_title, volume, goals_title, aavs_html, responsibilities_html, links_html)

    end

    local html = string.format([[
    <div class="grid">
        %s
    </div>
    ]],  coordinations_html)

    return html
end

return Coordinations