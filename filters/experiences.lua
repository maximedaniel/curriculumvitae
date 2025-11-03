local Experiences = {}

function Experiences.render(metadata, debug)
    local printable = metadata.printable or {}
    local experiences = metadata.experiences or {}
    local experiences_html = ""
      for _, experience in ipairs(experiences) do
        if debug then
            quarto.log.output(experience) 
        end
        local thumbnail = pandoc.utils.stringify(experience.thumbnail or "")
        local position = pandoc.utils.stringify(experience.position or "")
        local period = pandoc.utils.stringify(experience.period or "")
        local img_html = thumbnail ~= "" and string.format('<img src="%s" style="max-height: 100px; max-width: 100%%; object-fit: contain;">', thumbnail) or ""
        if printable then
        experiences_html = experiences_html .. string.format([[
            <div class="g-col-12">
                <div class="grid">
                <div class="g-col-3 d-flex align-items-center justify-content-center">
                    %s
                </div>
                <div class="g-col-9 d-flex align-items-center">
                    <div style="display: flex; flex-direction: column; line-height: 1.2;">
                    <div style="font-size: 1em;">%s</div>
                    <div style="font-size: 0.8em; color: rgba(0,0,0,.4);">%s</div>
                    </div>
                </div>
                </div>
            </div>
        ]], img_html, position, period)
        else
        experiences_html = experiences_html .. string.format([[
            <div class="g-col-12">
                <div class="grid">
                <div class="g-col-2 d-flex align-items-center justify-content-center">
                    %s
                </div>
                <div class="g-col-10 d-flex align-items-center">
                    <div style="display: flex; flex-direction: column; line-height: 1.2;">
                    <div style="font-size: 1em;">%s</div>
                    <div style="font-size: 0.8em; color: rgba(0,0,0,.4);">%s</div>
                    </div>
                </div>
                </div>
            </div>
        ]], img_html, position, period)
        end

    end

    local html = string.format([[
    <div class="grid">
        %s
    </div>
    ]], experiences_html)

    return html
end

return Experiences