import { defineField,defineType } from "sanity";
export const heroImagetype = defineType(
    {
        name:'heroImage',
        type:'document',
        title:'Three Hero Images',
        fields:[
            {
                name:'image1',
                type:'image',
                title:'First Image',
            },
            {
                name:'image2',
                type:'image',
                title:'Second Image',
            },
            {
                name:'image3',
                type:'image',
                title:'Third Image',
            }
        ]
    }
)