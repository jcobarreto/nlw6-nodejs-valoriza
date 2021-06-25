import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";
import { classToPlain } from "class-transformer";

class ListTagsService {
  async execute() {
    const tagsRepository = getCustomRepository(TagsRepository);

    // Trecho para incluir o campo hashtag na resposta. Porém, foi a opção utilizada foi 
    // usando a biblioteca class-transformer usando o @Expose na entidade (entity) Tag
    // mundando no service tb e usando o classToPlain tb da lib class-transformer

    // let tags = await tagsRepository.find();
    // tags = tags.map((tag) => ({ ...tag, custom_name: `#${tag.name}` }));

    const tags = await tagsRepository.find();

    return classToPlain(tags);
  }
}

export { ListTagsService };