local Missions = {}

function Missions.render(metadata, debug)
    local lang = pandoc.utils.stringify(metadata.lang) or "en"
    local missions_title = pandoc.utils.stringify(metadata.missions.title[lang] or "Missions")
    local missions = metadata.missions.items or {}
    local missions_html = ""
      for _, mission in ipairs(missions) do
        if debug then
            quarto.log.output(mission) 
        end
        local thumbnail = pandoc.utils.stringify(mission.thumbnail or "")
        local position = pandoc.utils.stringify(mission.position[lang] or "")
        local period = pandoc.utils.stringify(mission.period[lang] or "")
        local img_html = thumbnail ~= "" and string.format('<img src="%s" style="max-height: 100px; max-width: 100%%; object-fit: contain;">', thumbnail) or ""
        missions_html = missions_html .. string.format([[
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

    local html = string.format([[
    <div class="grid">
        %s
    </div>
    ]], missions_html)

    return html
end

return Missions