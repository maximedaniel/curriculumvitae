local Experiences = {}

function Experiences.render(metadata, debug)
    local printable = metadata.printable or false
    local lang = pandoc.utils.stringify(metadata.lang) or "en"
    local experiences_title = pandoc.utils.stringify(metadata.experiences.title[lang] or "Experiences")
    local experiences = metadata.experiences.items or {}
    local experiences_html = ""
      for _, experience in ipairs(experiences) do
        if debug then
            quarto.log.output(experience) 
        end
        local thumbnail = pandoc.utils.stringify(experience.thumbnail or "")
        local position = pandoc.utils.stringify(experience.position[lang] or "")
        local period = pandoc.utils.stringify(experience.period[lang] or "")
        local url = pandoc.utils.stringify(experience.url or "")
        local institution = pandoc.utils.stringify(experience.institution[lang] or "")
        local location = pandoc.utils.stringify(experience.location[lang] or "")
        local img_html = thumbnail ~= "" and string.format('<img src="%s" style="max-height: 100px; max-width: 100%%; object-fit: contain;">', thumbnail) or ""
        if printable then
            local institution_html = ""
            if institution ~= "" then
                institution_html = string.format('<a href="%s" target="_blank">%s <i class="bi bi-box-arrow-up-right" style="font-size:0.8em;"></i></a>,', url, institution)
            end
            experiences_html = experiences_html .. string.format([[
                <tr>
                <td style="text-align: right;">%s</td>
                <td>
                <b>%s</b>
                <br>
                %s %s
                </td>
                </tr>
            ]], period, position, institution_html, location)
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
    if printable then
        experiences_html = string.format([[
            <div class="g-col-12">
                <table class="table table-borderless">
                    <tbody>
                        %s
                    </tbody>
                </table>
            </div>
        ]], experiences_html)
    end
    local html = string.format([[
    <div class="grid gap-2">
        %s
    </div>
    ]], experiences_html)

    return html
end

return Experiences