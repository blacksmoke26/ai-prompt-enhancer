/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { QueryInterface } from 'sequelize';

// db
import { Formality, Tone } from '~/database/models';

// constants
import { TONES_GROUPED } from '~/constants/tones';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    for await (const { category, tones } of TONES_GROUPED) {
      for await (const tone of tones) {
        const count = await Tone.count({
          where: { key: tone.key },
        });

        if (!count) {
          await Tone.create({
            key: tone.key,
            name: tone.label,
            category: category,
            shortDescription: tone.shortDescription,
            summary: tone.summary,
            description: tone.description,
            parameters: tone.parameters,
            tags: tone.tags,
            formality: tone.formality as Formality,
            hidden: false,
          });
        }
      }
    }
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  },
};
