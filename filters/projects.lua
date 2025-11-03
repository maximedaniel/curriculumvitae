local Projects = {}

function Projects.render(metadata, debug)
    local printable = metadata.printable or false
    local projects = metadata.projects or {}
    local projects_html = ""
    for i, project in ipairs(projects) do
        if debug then
            quarto.log.output(project) 
        end
        local thumbnail = pandoc.utils.stringify(project.thumbnail or "")
        local video_data = ""
        local video_link = ""
        if project.youtube then
            video_data = string.format("data-youtube-id='%s'", pandoc.utils.stringify(project.youtube))
            video_link = string.format("https://www.youtube.com/watch?v=%s", pandoc.utils.stringify(project.youtube)) 
        end
        if project.vimeo then
            video_data = string.format("data-vimeo-id='%s'", pandoc.utils.stringify(project.vimeo))
            video_link = string.format("https://vimeo.com/%s", pandoc.utils.stringify(project.vimeo)) 
        end
        local name = pandoc.utils.stringify(project.name or "")
        local period = pandoc.utils.stringify(project.period or "")
        local keywords = pandoc.utils.stringify(project.keywords or "")
        local abstract = pandoc.utils.stringify(project.abstract or "")
        local fundings = pandoc.utils.stringify(project.fundings or "")
        local contributors = pandoc.utils.stringify(project.contributors or "")
        if printable then
             projects_html = projects_html .. string.format([[
                <div class="g-col-4">
                        <img src="%s" class="card-img-top">
                </div>
                <div class="g-col-8">
                    <div class="text-start">
                        <div class="fw-bold fs-5">%s</div>
                        <div class="text-muted fs-6">%s</div>
                        <div style="margin-bottom:0.25rem;">%s</div>
                        <div style="margin-bottom:0.25rem;"><b>Keywords:</b> %s</div>
                        <div style="margin-bottom:0.25rem;"><b>Video:</b> <a href="%s">%s</a></div>
                        <div style="margin-bottom:0.25rem;"><b>Contributors:</b> %s</div>
                        <div><b>Fundings:</b> %s</div>

                    </div>
                </div>
            ]], thumbnail, name, period, abstract, keywords, video_link, video_link, contributors, fundings)
        else
            local project_id = "project_"..i
            projects_html = projects_html .. string.format([[
                <div class="card g-col-12 g-col-sm-12 g-col-md-6 g-col-lg-4" style="--bs-card-title-spacer-y:0">
                        <div style="position: relative; width: 100%%; height: auto; cursor: pointer;">
                        <img src="%s" class="card-img-top" alt="Video thumbnail" id="thumbnail" %s>
                            <div style="
                                position: absolute;
                                top: 50%%;
                                left: 50%%;
                                transform: translate(-50%%, -50%%);
                                font-size: 5rem;
                                color: white;
                                text-shadow: 0 0 10px rgba(0,0,0,0.7);
                            "  onclick="loadVideo(this)">
                            <i class="bi bi-play-circle-fill"></i>
                            </div>
                        </div>
                        <div class="card-body"  style="padding-top:0.5rem;">
                            <div class="card-title d-flex justify-content-between align-items-center">
                                <div class="text-start">
                                    <span class="fw-bold fs-5">%s</span><br>
                                    <span class="text-muted fs-6">%s</span>
                                </div>

                                <a class="btn btn-outline-dark btn-sm btn-collapse" id="%s" role="button">
                                    <i class="bi bi-caret-right-fill"></i><span> More</span>
                                </a>
                            </div>
                            <div class="card-text">
                                <div class="collapse" id="%s">
                                    <div style="margin-bottom:0.25rem;">%s</div>
                                    <div style="margin-bottom:0.25rem;"><b>Keywords:</b> %s</div>
                                    <div style="margin-bottom:0.25rem;"><b>Contributors:</b> %s</div>
                                    <div><b>Fundings:</b> %s</div>
                                </div>
                            </div>
                        </div>
                    </div>
            ]], thumbnail, video_data, name, period, project_id, project_id, abstract, keywords, contributors, fundings)
        end
    end

    local html = string.format([[
    <div class="grid" style="--bs-gap: 2rem 2rem;">
        %s
    </div>
    ]], projects_html)

    return html
end

return Projects