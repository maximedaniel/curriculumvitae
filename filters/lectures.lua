local Lectures = {}

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

function Lectures.render(metadata, debug)
    local printable = metadata.printable or false
    local lectures = metadata.lectures or {}
    if debug then
        quarto.log.output(lectures) 
    end
    local lectures_html = ""
    for i, lecture in ipairs(lectures) do
        local year = pandoc.utils.stringify(lecture.year or "")
        local courses_html = ""
        local courses = lecture.courses or {}
        -- table.sort(courses, function(a, b)
        --     local a_cycle_str = pandoc.utils.stringify(a.cycle)
        --     local b_cycle_str = pandoc.utils.stringify(b.cycle)
        --     return a_cycle_str > b_cycle_str
        -- end)
        total_duration = 0
        total_size = 0
        for j, course in ipairs(courses) do
            local name = pandoc.utils.stringify(course.name or "")
            local tools = pandoc.utils.stringify(course.tools or "")
            local role = pandoc.utils.stringify(course.role or "")
            local duration = pandoc.utils.stringify(course.duration or "")
            local numeric_duration = tonumber(duration:match("%d+"))
            total_duration = total_duration + numeric_duration
            local status = pandoc.utils.stringify(course.status or "")
            local cycle = pandoc.utils.stringify(course.cycle or "")
            local school = pandoc.utils.stringify(course.school or "")
            local size = pandoc.utils.stringify(course.size or "")
            local numeric_size = tonumber(size)
            total_size = total_size + numeric_size
            local collapse_id = "collapse_"..year.."_"..j
            local tools_html = ""
            local tools_list = split_and_trim(tools)
            for k, tool in ipairs(tools_list) do
                tools_html = tools_html .. string.format([[
                <span class="badge bg-light">%s</span>
                ]], tool);
            end
            local display_year = ""
            if j == 1 and year ~= nil and year ~= "" then
                display_year = year
            end
            --             <th scope="col">Year</th>
            -- <th scope="col">Cycle</th>
            -- <th scope="col">Name</th>
            -- <th scope="col">Role</th>
            -- <th scope="col">Duration</th>
            -- <th scope="col">Status</th>
            -- <th scope="col">Size</th>
            if printable then
                courses_html = courses_html .. string.format([[
                <tr>
                <td>
                <div class="text-start" style="font-size: 1.25rem;font-weight: 400;line-height: 1.2;">%s</div>
                <div>%s</div>
                </td>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                </tr>]], name, tools_html, role, cycle, school, size, duration)
            else
                courses_html = courses_html .. string.format([[
                <tr>
                <td>
                <div class="text-start" style="font-size: 1.25rem;font-weight: 400;line-height: 1.2;">%s</div>
                <div>%s</div>
                </td>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                </tr>]], name, tools_html, role, cycle, school, size, duration)
            end 
        end
        local total_html = string.format([[
            <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th scope="row">%sh</th>
            </tr>]], total_duration)

        lectures_html = lectures_html .. string.format([[
            <div class="g-col-12">
            <h3 style="margin-top:0;">%s</h3>
            <table class="table table-borderless table-sm">
            <thead>
                <tr>
                <th scope="col">Course</th>
                <th scope="col">Role</th>
                <th scope="col">Level</th>
                <th scope="col">School</th>
                <th scope="col">Students</th>
                <th scope="col">Hours</th>
                </tr>
            </thead>
            <tbody>
            %s
            %s
            </tbody>
            </table>
            </div>
            ]], year, courses_html, total_html)
    end
    local html = string.format([[
    <div class="grid" style="--bs-gap:0">
        %s
    </div>
    ]], lectures_html)


    return html
end

return Lectures