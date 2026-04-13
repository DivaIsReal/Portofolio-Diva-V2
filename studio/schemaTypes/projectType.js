import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'Completed' },
          { title: 'Ongoing', value: 'Ongoing' },
          { title: 'Archived', value: 'Archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'Completed',
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repository URL',
      type: 'url',
    }),
    defineField({
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'documentation',
      title: 'Documentation',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'object',
          name: 'commandBlock',
          title: 'Command Block',
          fields: [
            defineField({
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'Bash', value: 'bash' },
                  { title: 'Shell', value: 'shell' },
                  { title: 'PowerShell', value: 'powershell' },
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'JSON', value: 'json' },
                  { title: 'YAML', value: 'yaml' }
                ]
              },
              initialValue: 'bash'
            }),
            defineField({
              name: 'code',
              title: 'Code / Command',
              type: 'text',
              rows: 8,
              validation: (Rule) => Rule.required()
            })
          ],
          preview: {
            select: {
              language: 'language',
              code: 'code'
            },
            prepare({ language, code }) {
              return {
                title: `Command (${language || 'text'})`,
                subtitle: code ? code.split('\n')[0] : 'No command yet'
              };
            }
          }
        }
      ],
      description: 'Use rich editor tools for headings, lists, tables-style content, and code/command blocks.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'thumbnail',
    },
  },
});
