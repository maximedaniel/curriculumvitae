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
    local coordinations = metadata.coordinations or {}
    local coordinations_html = ""
      for _, coordination in ipairs(coordinations) do
        if debug then
            quarto.log.output(coordination) 
        end

        local name = pandoc.utils.stringify(coordination.name or "")
        local period = pandoc.utils.stringify(coordination.period or "")
        local volume = pandoc.utils.stringify(coordination.volume or "")
        local level = pandoc.utils.stringify(coordination.level or "")
        local location = pandoc.utils.stringify(coordination.location or "")
        local tools = pandoc.utils.stringify(coordination.tools or "")
        local tools_html = ""
        local tools_list = split_and_trim(tools)
        for k, tool in ipairs(tools_list) do
            tools_html = tools_html .. string.format([[
            <span class="badge bg-light">%s</span>
            ]], tool);
        end

        local aavs = coordination.aavs or {}
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


        coordinations_html = coordinations_html .. string.format([[
            <div class="g-col-12 g-col-sm-12 g-col-md-12 g-col-lg-6">
                <div class="text-start" style="font-size: 1.25rem;font-weight: 400;line-height: 1.2;">%s</div>
                <div class="text-start" style="font-size: 1rem;font-weight: 400; line-height: 1; opacity:0.75;">%s</div>
                <div class="text-start" style="margin-bottom:0.5rem;">%s</div>
                <div class="text-start"><i class="bi bi-bookmark-fill"></i> <b>level:</b> %s</div>
                <div class="text-start"><i class="bi bi-geo-alt-fill"></i> <b>location:</b> %s</div>
                <div class="text-start"><i class="bi bi-stopwatch"></i> <b>volume:</b> %s</div>
                <div class="text-start"><i class="bi bi-bullseye"></i> <b>outcomes:</b><ul style="margin-bottom:0.25rem;">%s</ul></div>
            </div>
        ]], name, period, tools_html, level, location, volume, aavs_html)

    end

    local html = string.format([[
    <div class="grid">
        %s
    </div>
    ]], coordinations_html)

    return html
end

return Coordinations