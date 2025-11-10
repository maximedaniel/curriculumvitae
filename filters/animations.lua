local Animations = {}

function Animations.render(metadata, debug)
    local lang = pandoc.utils.stringify(metadata.lang) or "en"
    local animations_title = pandoc.utils.stringify(metadata.animations.titles.title[lang] or "Animations")
    local animations = metadata.animations.items or {}
    local animations_html = ""
    for i, animation in ipairs(animations) do
        if debug then
            quarto.log.output(animation) 
        end

        local type = pandoc.utils.stringify(animation.type[lang] or "")
        local title = pandoc.utils.stringify(animation.title[lang] or "")
        local description = pandoc.utils.stringify(animation.description[lang] or "")
        local description_title = pandoc.utils.stringify(metadata.animations.titles.headers[lang][1] or "description")
        local role = pandoc.utils.stringify(animation.role[lang] or "")
        local role_title = pandoc.utils.stringify(metadata.animations.titles.headers[lang][2] or "role")
        local date = pandoc.utils.stringify(animation.date[lang] or "")
        local date_title = pandoc.utils.stringify(metadata.animations.titles.headers[lang][3] or "date")
        local location = pandoc.utils.stringify(animation.location[lang] or "")
        local location_title = pandoc.utils.stringify(metadata.animations.titles.headers[lang][4] or "location")

        animations_html = animations_html .. string.format([[
        <div class="g-col-12 g-col-sm-12 g-col-md-12 g-col-lg-6">
            <div class="text-start" style="font-size: 1.25rem;font-weight: 400;line-height: 1.2;">%s</div>
            <div class="text-start" style="font-size: 1rem;font-weight: 400; line-height: 1; opacity:0.75; margin-bottom:0.5rem;">%s</div>
            <div class="text-start"><i class="bi bi-card-text"></i> <b>%s:</b> <i>%s</i></div>
            <div class="text-start"><i class="bi bi-person-fill"></i> <b>%s:</b> %s</div>
            <div class="text-start"><i class="bi bi-calendar"></i> <b>%s:</b> %s</div>
            <div class="text-start"><i class="bi bi-geo-alt-fill"></i> <b>%s:</b> %s</div>
        </div>
        ]], type, title, description_title, description, role_title, role, date_title, date, location_title, location)
    end

    local html = string.format([[
    <div class="grid">
        %s
    </div>
    ]], animations_html)

    return html
end

return Animations