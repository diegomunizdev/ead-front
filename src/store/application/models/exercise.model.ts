import { JsonUtils } from '../utils/json.util'

export default class Exercise {
  private _id: string | undefined
  private _created_at: string | undefined
  private _file: string | undefined
  private _title: string | undefined
  private _description: string | undefined
  private _delivery: string | undefined
  private _urlVideo: string | undefined
  private _subjectId: string | undefined

  constructor() {
    this._id = ''
    this._created_at = ''
    this._file = ''
    this._title = ''
    this._description = ''
    this._delivery = ''
    this._urlVideo = ''
    this._subjectId = ''
  }

  get id(): string | undefined {
    return this._id
  }

  set id(value: string | undefined) {
    this._id = value
  }

  get created_at(): string | undefined {
    return this._created_at
  }

  set created_at(value: string | undefined) {
    this._created_at = value
  }

  get file(): string | undefined {
    return this._file
  }

  set file(value: string | undefined) {
    this._file = value
  }

  get title(): string | undefined {
    return this._title
  }

  set title(value: string | undefined) {
    this._title = value
  }

  get description(): string | undefined {
    return this._description
  }

  set description(value: string | undefined) {
    this._description = value
  }

  get delivery(): string | undefined {
    return this._delivery
  }

  set delivery(value: string | undefined) {
    this._delivery = value
  }

  get urlVideo(): string | undefined {
    return this._urlVideo
  }

  set urlVideo(value: string | undefined) {
    this._urlVideo = value
  }

  get subjectId(): string | undefined {
    return this._subjectId
  }

  set subjectId(value: string | undefined) {
    this._subjectId = value
  }

  public fromJSON(json: any): Exercise {
    if (!json) {
      return this
    }

    if (typeof json === 'string') {
      if (!JsonUtils.isJSONString(json)) {
        return this
      }
      json = JSON.parse(json)
    }

    if (json.id !== undefined) {
      this._id = json.id
    }

    if (json.created_at !== undefined) {
      this._created_at = json.created_at
    }

    if (json.file !== undefined) {
      this._file = json.file
    }

    if (json.title !== undefined) {
      this._title = json.title
    }

    if (json.description !== undefined) {
      this._description = json.description
    }

    if (json.delivery !== undefined) {
      this._delivery = json.delivery
    }

    if (json.urlVideo !== undefined) {
      this._urlVideo = json.urlVideo
    }

    if (json.subjectId !== undefined) {
      this._subjectId = json.subjectId
    }

    return this
  }

  public toJSON(): any {
    return {
      id: this.id ? this.id : undefined,
      created_at: this.created_at ? this.created_at : undefined,
      file: this.file ? this.file : undefined,
      title: this.title ? this.title : undefined,
      description: this.description ? this.description : undefined,
      delivery: this.delivery ? this.delivery : undefined,
      urlVideo: this.urlVideo ? this.urlVideo : undefined,
      subjectId: this.subjectId ? this.subjectId : undefined
    }
  }
}