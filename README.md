# TechSprint #02 — June 2026 — File Picker

This repository hosts the work on **defining a File Picker standard for Open Buro**.

The goal: to allow any application (mail, docs, chat, calendar…) to ask any drive
(TDrive, Fichier DINUM, Nextcloud…) to display a file selection interface, and to
receive the result in a standardized way.

## Why the File Picker first

Picking a file from one application while working in another is the smallest complete proof that two independently-built services can cooperate deeply — not merely sit side by side. It is concrete, universally needed, and bounded enough to specify and demonstrate quickly. Starting from a working use case (rather than from abstract governance debates) is a deliberate sequencing choice: architecture conditions governance, and a demonstration earns the credibility that a specification alone cannot.

## Produced specification

- [Open Buro - Specification - File Picker ](./Open%20Buro%20—%20File%20Picker.md)

## Generate documentation from JSON Schema

We used [jsonschema2md](https://pypi.org/project/jsonschema2md/) to generate the markdown documentation from the schema definitions.

## Learn more

- Background and introduction to Open Buro:
  [LinkedIn post by Benjamin André](https://www.linkedin.com/posts/benjam1andre_la-workplace-souveraine-open-buro-et-la-activity-7470368736391389184-En8f?utm_source=share&utm_medium=member_desktop&rcm=ACoAAACiZrIBoTReH05MDF2nQXykjIdLih6OZGM)
- Previous TechSprint: [TechSprint #01 — April 2026](https://github.com/openburo/TechSprint-n-01-april-20206-FilePicker)
