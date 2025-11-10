local Supervisions = {}

function Supervisions.render(metadata, debug)
    local lang = pandoc.utils.stringify(metadata.lang) or "en"
    local supervision_title = pandoc.utils.stringify(metadata.supervisions.titles.title[lang] or "Supervisions")
    local supervisions = metadata.supervisions.items or {}
    local supervisions_html = ""
    for i, supervision in ipairs(supervisions) do
        if debug then
            quarto.log.output(supervision) 
        end
        local name = pandoc.utils.stringify(supervision.name or "")
        local level = pandoc.utils.stringify(supervision.level[lang] or "")
        local topic = pandoc.utils.stringify(supervision.topic[lang] or "")
        local topic_title = pandoc.utils.stringify(metadata.supervisions.titles.headers[lang][1] or "topic")
        local duration = pandoc.utils.stringify(supervision.duration[lang] or "")
        local duration_title = pandoc.utils.stringify(metadata.supervisions.titles.headers[lang][2] or "duration")
        local location = pandoc.utils.stringify(supervision.location[lang] or "")
        local location_title = pandoc.utils.stringify(metadata.supervisions.titles.headers[lang][3] or "location")
        local supervisor = pandoc.utils.stringify(supervision.supervisor[lang] or "")
        local supervisor_title = pandoc.utils.stringify(metadata.supervisions.titles.headers[lang][4] or "supervisor")
        supervisions_html = supervisions_html .. string.format([[
        <div class="g-col-12 g-col-sm-12 g-col-md-12 g-col-lg-6">
            <div class="text-start" style="font-size: 1.25rem;font-weight: 400;line-height: 1.2;">%s</div>
            <div class="text-start" style="font-size: 1rem;font-weight: 400; line-height: 1; opacity:0.75; margin-bottom:0.5rem;">%s</div>
            <div class="text-start"><i class="bi bi-bookmark-fill"></i><b>%s:</b> <i>%s</i></div>
            <div class="text-start"><i class="bi bi-hourglass-split"></i><b>%s:</b> %s</div>
            <div class="text-start"><i class="bi bi-geo-alt-fill"></i><b>%s:</b> %s</div>
            <div class="text-start"><i class="bi bi-clipboard2-check-fill"></i><b>%s:</b> %s</div>
        </div>
        ]], name,  level, topic_title, topic, duration_title, duration, location_title, location, supervisor_title, supervisor)
        -- local thumbnail = pandoc.utils.stringify(project.thumbnail or "")
        -- local youtube = ""
        -- if project.youtube then
        --     youtube = string.format("data-youtube-id='%s'", pandoc.utils.stringify(project.youtube))
        -- end
        -- local vimeo = ""
        -- if project.vimeo then
        --     youtube = string.format("data-vimeo-id='%s'", pandoc.utils.stringify(project.vimeo))
        -- end
        -- local name = pandoc.utils.stringify(project.name or "")
        -- local period = pandoc.utils.stringify(project.period or "")
        -- local keywords = pandoc.utils.stringify(project.keywords or "")
        -- local abstract = pandoc.utils.stringify(project.abstract or "")
        -- local project_id = "project_"..i
        -- projects_html = projects_html .. string.format([[
        --     <div class="card g-col-12 g-col-sm-12 g-col-md-6 g-col-lg-4" style="--bs-card-title-spacer-y:0">
        --             <div style="position: relative; width: 100%%; height: auto; cursor: pointer;">
        --             <img src="%s" class="card-img-top" alt="Video thumbnail" id="thumbnail" %s %s>
        --                 <div style="
        --                     position: absolute;
        --                     top: 50%%;
        --                     left: 50%%;
        --                     transform: translate(-50%%, -50%%);
        --                     font-size: 5rem;
        --                     color: white;
        --                     text-shadow: 0 0 10px rgba(0,0,0,0.7);
        --                 "  onclick="loadVideo(this)">
        --                 <i class="bi bi-play-circle-fill"></i>
        --                 </div>
        --             </div>
        --             <div class="card-body"  style="padding-top:0.5rem;">
        --                 <div class="card-title d-flex justify-content-between align-items-center">
        --                     <div class="text-start">
        --                         <span class="fw-bold fs-5">%s</span><br>
        --                         <span class="text-muted fs-6">%s</span>
        --                     </div>

        --                     <a class="btn btn-outline-dark btn-sm btn-collapse" id="%s" role="button">
        --                         <i class="bi bi-caret-right-fill"></i><span> More</span>
        --                     </a>
        --                 </div>
        --                 <div class="card-text">
        --                     <div class="collapse" id="%s">
        --                         <b>Keywords:</b> %s<br/>
        --                         <b>Abstract:</b> %s
        --                     </div>
        --                 </div>
        --             </div>
        --         </div>
        -- ]], thumbnail, youtube, vimeo, name, period, project_id, project_id, keywords, abstract)
    end

    local html = string.format([[
    <div class="grid">
        %s
    </div>
    ]], supervisions_html)

    return html
end

return Supervisions