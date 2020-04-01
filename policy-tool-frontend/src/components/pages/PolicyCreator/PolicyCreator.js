import React, { useState, useMemo, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import MuiDataform from 'mui-dataforms'
import { useHistory } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

import AttributeEditor from './AttributeEditor/AttributeEditor'
import PreviewJson from '../../common/PreviewJson'
import LoadingWrapper from '../../common/LoadingWrapper'

import {
  useGetValidAttributes,
  useGetValidConditions
} from '../../../functions/useAPI'

export default function PolicyCreator() {
  const history = useHistory()

  const [conditions, setConditions] = useState({
    actions: '',
    precedence: '',
    effect: '',
    obligation: ''
  })

  const [info, setInfo] = useState({
    definition: '',
    id: '',
    label: '',
    source: ''
  })

  const [attributes, setAttributes] = useState([])
  const [resGetValidAttr, getValidAttributes] = useGetValidAttributes()
  const [resGetValidCond, getValidConditions] = useGetValidConditions()

  const isLoading = useMemo(() => {
    return resGetValidAttr.loading && resGetValidCond.loding
  }, [resGetValidAttr])

  const validAttributes = useMemo(() => {
    return resGetValidAttr.value || []
  }, [resGetValidAttr])

  const validConditons = useMemo(() => {
    return resGetValidAttr.value || []
  }, [resGetValidCond])

  useEffectOnce(() => {
    getValidAttributes()
    getValidConditions()
  })

  // Handling changes
  const handleOnChange = (setState) => (key) => (value) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  // Form fields
  const infoFields = [
    {
      title: 'Policy Information',
      description: 'Provide some basic information about the policy',
      fields: [
        {
          id: 'source',
          title: 'Policy Source',
          type: 'select',
          size: { sm: 6 },
          options: []
        },
        {
          id: 'id',
          title: 'Policy Id',
          type: 'text',
          size: { sm: 6 }
        },
        {
          id: 'label',
          title: 'Policy Label',
          type: 'text',
          size: { sm: 6 }
        },
        {
          type: 'spacer',
          size: { xs: false, sm: 6 }
        },
        {
          id: 'definition',
          title: 'Policy Definition',
          type: 'text'
        }
      ]
    }
  ]

  const conditionsFields = useMemo(() => {
    return [
      {
        title: 'Conditions and Effects',
        fields: [
          {
            id: 'action',
            title: 'Policy Action',
            type: 'select',
            size: { sm: 6 }
          },
          {
            type: 'spacer',
            size: { xs: false, sm: 6 }
          },
          {
            id: 'effect',
            title: 'Policy Effect',
            type: 'select',
            size: { sm: 6 }
          },
          {
            type: 'spacer',
            size: { xs: false, sm: 6 }
          },
          {
            id: 'obligations',
            title: 'Policy Obligations',
            type: 'select',
            size: { sm: 6 }
            // predefined, or user input
          },
          {
            type: 'spacer',
            size: { xs: false, sm: 6 }
          },
          {
            id: 'precedence',
            title: 'Policy Precedence',
            type: 'select',
            size: { sm: 6 }
          }
        ].map((v) => ({ ...v, values: [] }))
      }
    ]
  }, [resGetValidCond])

  return (
    <>
      <LoadingWrapper isLoading={isLoading}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <MuiDataform
              fields={infoFields}
              values={info}
              onChange={handleOnChange(setInfo)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'h5'}>Rules</Typography>
            <AttributeEditor
              attributes={attributes}
              setAttributes={setAttributes}
              validAttributes={validAttributes}
            />
          </Grid>
          <Grid item xs={12}>
            <MuiDataform
              fields={conditionsFields}
              values={conditions}
              onChange={handleOnChange(setConditions)}
            />
          </Grid>
          <Grid item xs={12}>
            <PreviewJson
              title={'Policy Preview'}
              data={{ info, attributes, conditions }}
            />
          </Grid>
        </Grid>
      </LoadingWrapper>
    </>
  )
}
