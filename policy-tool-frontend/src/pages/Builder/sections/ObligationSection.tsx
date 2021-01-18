import { Button, Grid, IconButton, TextField } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import _ from 'lodash'
import { MenuButton, Selector } from 'src/components'
import { Option, Value } from 'src/global'

export interface ObligationSectionProps {
  obligations: Value[]
  updateObligations: React.Dispatch<React.SetStateAction<Value[]>>
  validObligations: Option[]
}

const add = (value: Value) => (prev: Value[]): Value[] => [
  ...prev,
  _.cloneDeep(value),
]
const clear = (prev: Value[]): Value[] => []
const remove = (index: number) => (prev: Value[]): Value[] =>
  prev.filter((v, i) => i !== index)
const update = (index: number, value: any) => (prev: Value[]): Value[] =>
  prev.map((v, i) => (i !== index ? v : { ...v, value }))

export const ObligationSection: React.FC<ObligationSectionProps> = ({
  obligations,
  updateObligations,
  validObligations,
}) => (
  <Grid container spacing={2}>
    <Grid container item spacing={1}>
      <Grid item xs={12} md={2}>
        <MenuButton
          options={[
            {
              label: 'Obligation',
              menuItemProps: { disabled: !validObligations?.length },
            },
            {
              label: 'Custom Obligation',
            },
          ]}
          onSelectOption={(i) =>
            updateObligations(
              add({
                value: '',
                type:
                  i === 0
                    ? 'http://www.w3.org/2002/07/owl#Class'
                    : 'http://www.w3.org/2001/XMLSchema#string',
              })
            )
          }
          buttonProps={{ children: 'Add' }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          onClick={() => updateObligations(clear)}
          disabled={!obligations?.length}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
    <Grid container item spacing={2}>
      {!!obligations?.length &&
        obligations.map((o, i) => {
          let childProps = {
            label: `Obligation ${i}`,
            onChange: (event: any) =>
              updateObligations(update(i, event?.target?.value)),
            value: o.value,
          }
          return (
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems={'flex-start'}
              key={i}
            >
              <Grid item>
                <IconButton onClick={() => updateObligations(remove(i))}>
                  <Delete />
                </IconButton>
              </Grid>
              <Grid item xs={11} md={6}>
                {o.type === 'http://www.w3.org/2002/07/owl#Class' && (
                  <Selector
                    options={validObligations}
                    textFieldProps={{ ...childProps }}
                  />
                )}
                {o.type === 'http://www.w3.org/2001/XMLSchema#string' && (
                  <TextField {...childProps} />
                )}
              </Grid>
            </Grid>
          )
        })}
    </Grid>
  </Grid>
)